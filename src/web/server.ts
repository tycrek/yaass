import { Hono } from '@hono/hono';
import { WHO_AM_I } from '../utils.ts';
import stylesheet from './routes/stylesheet.css.ts';
import upload from './routes/upload.ts';
import needle from './routes/needle.ts';

const app = new Hono();

app.use((ctx, next) => (ctx.set('domain', new URL(ctx.req.url).origin), next()));
app.route('/stylesheet.css', stylesheet);
app.route('/upload', upload);
app.route('/', needle).get((ctx) => ctx.text(WHO_AM_I));

export default app.fetch;
