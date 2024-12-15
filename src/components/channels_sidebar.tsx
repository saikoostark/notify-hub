'use client';

import { analytics, auth, firestoreDB } from '@/firebase';
// import useFcmToken from '@/hooks/useFcmToken';
import Link from 'next/link';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logEvent } from 'firebase/analytics';
import useFcmToken from '@/hooks/useFcmToken';


export default function ChannelsSidebar() {
    const path = usePathname()
    const [user, ,] = useAuthState(auth);
    const [channelsValue, channelsLoading] = useCollection(collection(firestoreDB, 'channels'));
    const { fcmToken } = useFcmToken()






    async function toggleSubscribtion(channel: string) {
        if (!user)
            return;
        const subscribtion = channelsValue?.docs.find(a => a.id == channel)?.data().users.includes(user.uid) ? false : true;
        const jwt_token = await user.getIdToken();
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({
                token: jwt_token,
                channel,
                subscribtion,
                fcmToken
            })
        });

        if (response.ok && analytics != null) {
            logEvent(analytics, 'channel_subscription', {
                channel,
                action: subscribtion ? 'subscribe' : 'unsubscribe'
            });
        }
    }


    const glassEffectStyle: React.CSSProperties = {
        background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
        border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
        backdropFilter: 'blur(2px)', // Frosted glass effect
        WebkitBackdropFilter: 'blur(2px)', // Safari support
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
        // padding: '8px', // Inner padding
        color: '#fff', // Text color for contrast
    };

    return (
        // <div className={`channels ${path === '/' ? 'flex md:w-[30vw] md:border-r-[1px] w-[100vw]' : 'hidden'} md:flex max-h-[100vh]  flex-col  bg-transparent gap-y-5 py-5 overflow-y-auto px-5 md:w-[30vw]`} >
        <div className={`channels ${path === '/channels' ? 'flex md:w-[30vw] md:border-r-[1px] w-[100vw]' : 'hidden'} md:flex max-h-[100vh]  flex-col  bg-transparent gap-y-5 py-5 overflow-y-auto px-5 md:w-[30vw] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 md:border-gray-200 shadow-2xl`} >

            {
                !channelsLoading && channelsValue?.docs?.map(my_doc => {
                    const is_i_exist = my_doc?.data().users?.includes(user?.uid) ?? 0;
                    return (
                        <div key={my_doc.id} className=' rounded-lg flex p-2' style={glassEffectStyle}>
                            <Link href={is_i_exist ? `/channels/${my_doc.id}` : '/channels'} className="flex w-[80%] items-center gap-x-3">
                                <Image src="/people.png"
                                    width={45}
                                    height={45}
                                    alt={my_doc.id}
                                    className="border rounded-full p-2" />
                                <h1 title={my_doc.id} className="line-clamp-1 text-ellipsis overflow-hidden w-[50%]" >{my_doc.id}</h1>
                            </Link>
                            <button
                                className=' rounded-lg p-1'
                                onClick={() => toggleSubscribtion(my_doc.id)}
                                style={glassEffectStyle}
                            >
                                {is_i_exist ? 'unSubscribe' : 'subscribe'}
                            </button>
                        </div>


                    )
                })
            }
        </div>
    )
}
