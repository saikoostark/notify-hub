'use client';

import { auth } from '@/firebase';
import Image from 'next/image';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

export default function Google() {

    const [signInWithGoogle] = useSignInWithGoogle(auth);

    return (
        <div onClick={() => signInWithGoogle()} className="google p-3 bg-white text-black flex gap-x-2 border rounded-xl items-center w-full font-medium cursor-pointer">
            <Image src="/google_logo.png" width={25} height={20} alt='google' />
            <p className='w-[80%] text-center	' >Continue With Google</p>
        </div>
    )
}
