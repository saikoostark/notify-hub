'use client';

import React, { useEffect, useState } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { firebaseApp, firestoreDB } from '@/firebase';
import useFcmToken from '@/hooks/useFcmToken';
import Link from 'next/link';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import Notification from "@/components/notification";

type NotificationType = {
    active: boolean;
    title: string;
    body: string;
}

export default function ChannelsSidebar() {
    const path = usePathname()
    const { fcmToken } = useFcmToken();
    const [notificationContent, setNotificationContent] = useState<NotificationType>({
        active: false,
        title: '',
        body: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground push notification received:', payload);
                setNotificationContent({ active: true, title: payload.notification?.title ?? '', body: payload.notification?.body ?? '' });

                setTimeout(() => {
                    setNotificationContent({ active: false, title: '', body: '' });
                }, 10000);
            });
            return () => {
                unsubscribe(); // Unsubscribe from the onMessage event
            };
        }
    }, []);

    const [channelsValue, channelsLoading] = useCollection(collection(firestoreDB, 'channels'));





    async function toggleSubscribtion(channel: string) {
        await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify({
                token: fcmToken,
                channel: channel,
                subscribtion: channelsValue?.docs.find(a => a.id == channel)?.data().users.includes(fcmToken) ? false : true
            })
        })
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
        <div className={`channels ${path === '/' ? 'flex md:w-[30vw] md:border-r-[1px] w-[100vw]' : 'hidden'} md:flex max-h-[100vh]  flex-col  bg-transparent gap-y-5 py-5 overflow-y-auto px-5 md:w-[30vw]`} >

            {notificationContent.active && <Notification title={notificationContent.title} body={notificationContent.body} />}

            {
                !channelsLoading && channelsValue?.docs?.map(my_doc => {
                    const is_i_exist = my_doc?.data().users?.includes(fcmToken) ?? 0;
                    return (
                        <div key={my_doc.id} className=' rounded-lg flex p-2' style={glassEffectStyle}>
                            <Link href={is_i_exist ? `/channels/${my_doc.id}` : '/'} className="flex w-[80%] items-center gap-x-3">
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
