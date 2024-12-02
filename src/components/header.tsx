'use client';

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header()
{
    const [user, loading, error] = useAuthState(auth);
    
    async function logout() {
        await signOut(auth);
        };

	if (loading) {
		return null;
	}
	if (error) {
		return (
			<div>
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (user) {
		return (
			<div className='h-[7vh] w-screen p-2 flex justify-between bg-slate-600 items-center'>
                <h1 className="p-3 text-3xl">Chatico</h1>

                <div className=" flex justify-between items-center">
                    <h2>Welcome <span className='text-amber-600 text-lg font-bold'>{user.email ? user.email.slice(0, user.email.indexOf('@')) : null}</span></h2>
                    <button onClick={logout} className='p-3 w-fit'>
                        Logout
                    </button>
                </div>
		</div>
		);
	}
	return (
		<div className='h-[7vh] w-screen p-2 flex justify-between bg-slate-600 items-center'>
            <h1 className="p-3 text-3xl">Chatico</h1>

            <div className=" flex justify-between items-center">
                <Link className='p-3 w-fit' href="/signup">
                    Sign Up
                </Link>

                <Link className="p-3" href="/login">
                    Login
                </Link>
            </div>
		</div>
	);
}
