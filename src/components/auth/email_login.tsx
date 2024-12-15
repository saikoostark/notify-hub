import Image from 'next/image';
import Link from 'next/link';

export default function EmailLogin() {
    return (
        <Link href={'/login'} className="email p-3 bg-white text-black flex gap-x-2 border rounded-xl items-center w-full font-medium ">
            <Image src="/email.png" width={25} height={20} alt='google' />
            <p className='w-[80%] text-center	' >Login With Email</p>
        </Link>
    )
}
