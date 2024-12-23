'use client';

import EmailLogin from '@/components/auth/email_login';
import Google from '@/components/auth/google';
import { auth } from '@/firebase';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Github from '@/components/auth/github';

export default function PhoneLogin() {

    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);
    const sendOTPButtonRef = useRef<HTMLButtonElement>(null);
    const verifyCodeButtonRef = useRef<HTMLButtonElement>(null);
    const codeDivRef = useRef<HTMLDivElement>(null);
    const [errorMsgContent, setErrorMsgContent] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [userConfirmation, setUserConfirmation] = useState<ConfirmationResult | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);

    function showOTP() {
        if (sendOTPButtonRef.current && verifyCodeButtonRef.current && codeDivRef.current && phoneNumberRef.current) {

            sendOTPButtonRef.current.style.display = 'none';
            verifyCodeButtonRef.current.style.display = 'block';
            codeDivRef.current.style.display = 'block';
            setIsDisabled(true);

        }
    }

    async function send_top() {

        if (phoneNumberRef.current) {

            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
            try {
                if (recaptcha) {
                    const confirmation = await signInWithPhoneNumber(auth, phoneNumberRef.current?.value, recaptcha);
                    setUserConfirmation(confirmation);
                    showOTP();
                }
            } catch (error) {
                // setErrorMsgContent((error as Error).message);
                console.log(error);
            }
        }
    }



    async function handle_login() {

        if (phoneNumberRef.current === null || otpRef.current === null || verifyCodeButtonRef.current == null) {
            return;
        }

        verifyCodeButtonRef.current.disabled = true;

        try {
            await userConfirmation?.confirm(otpRef.current.value);
        } catch (error) {
            setErrorMsgContent((error as Error).message);
        }
        if (verifyCodeButtonRef.current)
            verifyCodeButtonRef.current.disabled = false;

    }



    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (errorMsgContent) {
            setErrorMsg(true);
            timeout = setTimeout(() => {
                setErrorMsg(false);
            }, 5000);
        }


        return () => {
            if (timeout)
                clearTimeout(timeout);
        }
    }, [errorMsgContent])

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-200 rounded-lg shadow-2xl px-8 py-6 w-96 flex flex-col gap-y-4 items-center">
            {errorMsg && errorMsgContent &&
                <p
                    className='absolute rounded-lg top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white text-red-600'>
                    {errorMsgContent}
                </p>
            }
            <h1>Login</h1>

            <div className='phone-form flex flex-col w-full gap-y-4 mb-10'>

                <div className='phone-data'>
                    <label htmlFor="phone-input">Phone Number</label>
                    <input disabled={isDisabled} ref={phoneNumberRef} type="tel" name='Phone-input' placeholder='Phone Number With (country code)'
                        className='w-full p-3 rounded-lg outline-none text-black font-medium'
                    />
                </div>

                <div id='recaptcha-container'></div>

                <button
                    onClick={send_top}
                    className='p-3 rounded-lg w-[50%] self-center bg-gray-800 disabled:bg-gray-400'
                    ref={sendOTPButtonRef}
                >
                    Send Code
                </button>

                <div className='otp-data hidden' ref={codeDivRef}>
                    <label htmlFor="otp-input">OTP code</label>
                    <input ref={otpRef} type="text" name='otp-input' placeholder='Place OTP code'
                        className='w-full p-3 rounded-lg outline-none text-black font-medium'
                    />
                </div>


                <button
                    onClick={handle_login}
                    className='p-3 rounded-lg w-[50%] self-center bg-gray-800 disabled:bg-gray-400 hidden '
                    ref={verifyCodeButtonRef}
                >
                    Verify Code
                </button>
            </div>


            <EmailLogin />
            <Google />
            <Github />


            <p className='font-light text-sm'>Don&#39;t have account?
                <Link href={'/register'} className='font-semibold text-base text-slate-800 '> Sign Up</Link>
            </p>

        </div>
    )
}
