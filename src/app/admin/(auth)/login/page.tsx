'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signin } from '@/helpers/authFunctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export default function Login() {
	const [user, userLoading] = useAuthState(auth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();


	useEffect(() => {
		if (!userLoading && user) {
			router.push('/');
		}
	}, [user, userLoading, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await signin(email, password);
			router.push('/');
		} catch (err) {
			setError((err as Error).message);
		}
	};

	if (!userLoading && !user)
		return (
			<form
				className='flex flex-col bg-slate-600 p-5 rounded-lg w-[30%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-y-4 items-center'
				onSubmit={handleSubmit}>
				<input
					className='p-2 text-lg text-black rounded-md outline-none w-[98%]'
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					className='p-2 text-lg text-black  rounded-md outline-none w-[98%]'
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button className='bg-teal-700 p-3 rounded-md text-lg' type="submit">Login</button>
				{error && <p>{error}</p>}
			</form>
		);
};
