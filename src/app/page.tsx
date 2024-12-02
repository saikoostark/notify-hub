'use client';

import ChannelsSidebar from '@/components/channels_sidebar';
import useFcmToken from '@/hooks/useFcmToken';


export default function Home() {

    const { notificationPermissionStatus } = useFcmToken();
    if (notificationPermissionStatus === 'denied') {
        return (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg	'>
                Sorry, You need to enable notifications to see channels
            </div>
        )
    } else if (!notificationPermissionStatus) {
        return null;
    }

    return (
        <div className="h-[100%] flex bg-wallpaper bg-scroll bg-cover">
            <ChannelsSidebar />
        </div>
    )
};


