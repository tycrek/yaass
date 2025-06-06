import Head from '../components/Head.tsx';
import Outlink from '../components/Outlink.tsx';
import type { PropsWithChildren } from 'hono/jsx';

const Error = (text: string) => (
	<div class='text-center'>
		<span class='text-red-500 font-bold'>{text}</span>
	</div>
);

export default ({ mode, page, error }: PropsWithChildren<{ mode: 'login' | 'register'; page?: 'dashboard' | 'admin'; error?: string }>) => {
	return (
		<html>
			<Head title={mode == 'login' ? 'Login' : 'Register'}>
				<script src='/login/swap.js' />
			</Head>
			<body class='h-full flex flex-center'>
				<div class='w-min rounded-2xl p-8 dark:bg-stone-800'>
					<Outlink>
						<img class='mb-4' src='/favicon.png' />
					</Outlink>

					{/* insert Error element if, one was supplied */}
					{error != null ? Error(`${error}`) : ''}

					{/* Login form */}
					<form class={mode == 'login' ? '' : 'hidden'} id='login' action={`/login?page=${page ?? 'dashboard'}`} method='post'>
						<p class='text-xl mt-4'>Username</p>
						<input name='username' type='text' autofocus class='input-text'></input>
						<p class='text-xl mt-4'>Password</p>
						<input name='password' type='password' class='input-text'></input>
						<div class='flex justify-around mt-4 gap-4 px-2'>
							<button class='button basis-full font-bold' type='submit'>Login</button>
							<button class='button basis-full' type='button' onclick='swap();'>
								Register
							</button>
						</div>
					</form>

					{/* Register form */}
					<form class={mode == 'register' ? '' : 'hidden'} id='register' action='/register' method='post'>
						<p class='text-xl mt-4'>Username</p>
						<input name='username' type='text' autofocus class='input-text'></input>
						<p class='text-xl mt-4'>Password</p>
						<input name='password' type='password' class='input-text'></input>
						<p class='text-xl mt-4'>Confirm Password</p>
						<input name='password2' type='password' class='input-text'></input>
						<div class='flex justify-around mt-4 gap-4 px-2'>
							<button class='button basis-full' type='button' onclick='swap();'>Login</button>
							<button class='button basis-full font-bold' type='submit'>Register</button>
						</div>
					</form>

					<div class='mt-4 text-sm italic text-center'>
						<Outlink />
					</div>
				</div>
			</body>
		</html>
	);
};
