'use client';

import { auth } from '@/firebase';
import Image from 'next/image';
import { useSignInWithGithub } from 'react-firebase-hooks/auth';

export default function Github() {

    const [signInWithGithub] = useSignInWithGithub(auth);


    return (
        <div onClick={() => signInWithGithub()} className="google p-3 bg-white text-black flex gap-x-2 border rounded-xl items-center w-full font-medium cursor-pointer">
            <Image src="/github.png" width={25} height={20} alt='google' />
            <p className='w-[80%] text-center	' >Continue With Github</p>
        </div>
    )
}
