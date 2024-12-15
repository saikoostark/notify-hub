'use client';

import ChannelsSidebar from '@/components/channels_sidebar';
import Head from 'next/head';


export default function Channels() {

    // const { notificationPermissionStatus } = useFcmToken();
    // if (notificationPermissionStatus === 'denied') {
    //     return (
    //         <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg	'>
    //             Sorry, You need to enable notifications to see channels
    //         </div>
    //     )
    // } else if (!notificationPermissionStatus) {
    //     return null;
    // }

    return (
        <>
            <Head>
                <title>Channels</title>
                <meta name="description" content="Browse and manage your channels dynamically." />
                <meta property="og:title" content="Channels" />
                <meta property="og:description" content="Browse and manage your channels dynamically." />
            </Head>
            <div className="h-[100%] flex bg-scroll bg-cover">
                <ChannelsSidebar />
            </div>
        </>
    )
};
