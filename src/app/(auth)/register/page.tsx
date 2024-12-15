'use client';


import Google from '@/components/auth/google';
import Link from 'next/link';
import { auth } from '@/firebase';
import { useEffect, useRef, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Github from '@/components/auth/github';

export default function Register() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const registerButtonRef = useRef<HTMLButtonElement>(null);
    const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth);
    const [errorMsg, setErrorMsg] = useState(false);


    async function handle_register() {

        if (emailRef.current === null || passwordRef.current === null) {
            return;
        }

        if (registerButtonRef.current)
            registerButtonRef.current.disabled = true;

        try {
            await createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            console.log(error);
        }

        if (registerButtonRef.current)
            registerButtonRef.current.disabled = false;
    }


    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (error?.message) {
            setErrorMsg(true);
            timeout = setTimeout(() => {
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
            <h1>Welcome to ChatDose</h1>

            <div className='email-form flex flex-col w-full gap-y-4 mb-10'>

                <div className='email-data'>
                    <label htmlFor="email-input">Email</label>
                    <input type="text" name='email-input' placeholder='Email'
                        className='w-full p-3 rounded-lg outline-none text-black font-medium'
                        ref={emailRef}
                    />
                </div>
                <div className='password-data'>
                    <label htmlFor="password-input">password</label>
                    <input type="password" name='password-input' placeholder='Password'
                        className='w-full p-3 rounded-lg outline-none text-black font-medium'
                        ref={passwordRef}
                    />
                </div>


                <button
                    ref={registerButtonRef}
                    className='p-3 rounded-lg w-[50%] self-center bg-gray-800 disabled:bg-gray-400'
                    onClick={handle_register}
                >
                    Register
                </button>
            </div>


            {/* <Phone /> */}
            <Google />
            <Github />



            <p className='font-light text-sm'>Have account?
                <Link href={'/login'} className='font-semibold text-base text-slate-800'> Login</Link></p>

        </div>
    )
}
