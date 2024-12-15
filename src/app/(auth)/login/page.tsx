'use client';

import Github from '@/components/auth/github';
import Google from '@/components/auth/google';
import { auth } from '@/firebase';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

export default function Login() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginButtonRef = useRef<HTMLButtonElement>(null);
    const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);
    const [errorMsg, setErrorMsg] = useState(false);

    async function handle_login() {

        if (emailRef.current === null || passwordRef.current === null) {
            return;
        }

        if (loginButtonRef.current)
            loginButtonRef.current.disabled = true;

        try {
            await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            console.log(error);
        }
        if (loginButtonRef.current)
            loginButtonRef.current.disabled = false;

    }



    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        if (error?.message) {
            setErrorMsg(true);
            timeout = timeout = setTimeout(() => {
                setErrorMsg(false);
            }, 5000);
        }


        return () => {
            if (timeout)
                clearTimeout(timeout);
        }
    }, [error])

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-200 rounded-lg shadow-2xl px-8 py-6 w-96 flex flex-col gap-y-4 items-center">
            {errorMsg && error &&
                <p
                    className='absolute rounded-lg top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white text-red-600'>
                    {error?.message}
                </p>
            }
            <h1>Login</h1>

            <div className='email-form flex flex-col w-full gap-y-4 mb-10'>

                <div className='email-data'>
                    <label htmlFor="email-input">Email</label>
                    <input ref={emailRef} type="text" name='email-input' placeholder='Email'
                        className='w-full p-3 rounded-lg outline-none text-black font-medium'
                    />
                </div>
                <div className='password-data'>
                    <label htmlFor="password-input">password</label>
                    <input ref={passwordRef} type="password" name='password-input' placeholder='Password'
                        className='w-full p-3 rounded-lg outline-none text-black font-medium'
                    />
                </div>


                <button
                    onClick={handle_login}
                    className='p-3 rounded-lg w-[50%] self-center bg-gray-800 disabled:bg-gray-400'
                    ref={loginButtonRef}
                >
                    Log In
                </button>
            </div>


            {/* <Phone /> */}
            <Google />
            <Github />


            <p className='font-light text-sm'>Don&#39;t have account?
                <Link href={'/register'} className='font-semibold text-base text-slate-800 '> Sign Up</Link>
            </p>

        </div>
    )
}
