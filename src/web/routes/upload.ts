import { Hono } from '@hono/hono';
import { crypto } from '@std/crypto';
import { encodeHex as hex } from '@std/encoding/hex';
import { monotonicUlid as ulid } from '@std/ulid';
import { generateRandomString, join, log } from '../../utils.ts';
import { DB } from '../../db.ts';
import type { Upload } from '../../types/Upload.ts';

const route = new Hono();

route.post('/', async (ctx) => {
	const body = await ctx.req.formData();

	if (!body.has('file')) {
		ctx.status(400);
		return ctx.text('file parameter missing');
	}

	// Get file from body
	const file = body.get('file') as File;

	// File details
	const uid = ulid();
	const nameOnDisk = `${uid}.${file.name.includes('.') ? file.name.split('.').pop() : 'unknown'}`;
	const location = 'data/uploads/' + nameOnDisk;
	const stream = file.stream();

	// Save file to disk
	await Deno.writeFile(join(location), stream);

	// Save details to database
	const upload: Upload = {
		uid,
		sid: generateRandomString(10),
		filename: file.name,
		location,
		timestamp: file.lastModified,
		hash: hex(await crypto.subtle.digest('BLAKE3', stream)),
		type: file.type,
		size: file.size,
		uploader_uid: '',
	};
	DB.putUpload(upload);

	log.info(`uploaded: ${upload.sid} [${upload.type}] [${upload.filename}] [${uid}]`);

	return ctx.json({ url: `${ctx.get('domain')}/${upload.sid}` });
});

export default route;
