'use client';

import { useList } from 'react-firebase-hooks/database';
import { realtimeDB } from '@/firebase';
import Image from "next/image";
import ChannelsSidebar from '@/components/channels_sidebar';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';
import { ref } from 'firebase/database';
import useFcmToken from '@/hooks/useFcmToken';


type UserMessage = {
    key: string;
    sender: string;
    text: string
}

export default function Chat({ params }: { params: Promise<{ channel_id: string }> }) {
    const channelId = use(params).channel_id
    const [messages, messagesLoading] = useList(ref(realtimeDB, `channels/${channelId}`));
    const [msgs, setMsgs] = useState<UserMessage[]>([])
    const [message, setMessage] = useState('');
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (messages && !messagesLoading) {
            const new_list = messages.map(element => {

                return { key: element.key, sender: element.val()['sender'], text: element.val()['text'] }
            }
            ) as UserMessage[]
            setMsgs(new_list);
        }
    }, [messages])


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [msgs]);


    useEffect(() => {

        if (fcmToken)
            console.log(fcmToken);
    }, [fcmToken])


    async function send_message() {
        if (message.length > 0) {
            await fetch('/api/messages/', {
                method: 'POST',
                body: JSON.stringify({
                    sender: fcmToken,
                    channel: channelId,
                    text: message
                }),
            });
            setMessage('');
        }
    }

    if (notificationPermissionStatus === 'denied') {
        return (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg	'>
                Sorry, You need to enable notifications to see channels
            </div>
        )
    } else if (!notificationPermissionStatus) {
        return null;
    }


    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await send_message();
        }
    };



    const glassEffectStyle: React.CSSProperties = {
        background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
        border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
        backdropFilter: 'blur(2px)', // Frosted glass effect
        WebkitBackdropFilter: 'blur(2px)', // Safari support
        // borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
        color: '#fff', // Text color for contrast
    };


    return (
        <div className="h-[100%] flex bg-wallpaper bg-scroll bg-cover gap-x-2">
            <ChannelsSidebar />

            <button
                style={glassEffectStyle}
                onClick={() => router.push('/')}
                className="rounded-full absolute top-2 right-3 bg-white	z-10"
            >
                <Image
                    src='/back.png'
                    alt="back.png"
                    width={40}
                    height={40}
                    title='back to home'
                />
            </button>


            <div className="chat bg-transparent grow flex flex-col">

                {!messagesLoading && <div className="masgs  h-[94vh] flex flex-col gap-y-5 p-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {
                        msgs.map((msg) => {
                            return (
                                <h1 style={glassEffectStyle} className={`msg shadow-lg opacity-80 bg-slate-900 shadow-cyan-500/50 border p-2 rounded-md ${msg.sender == fcmToken ? 'self-end' : 'self-start'}`} key={msg.key}>
                                    {msg.text}
                                </h1>
                            )
                        })
                    }
                    <div ref={messagesEndRef} />
                </div>}

                <div style={glassEffectStyle} className="sender h-[6vh] flex border items-center rounded-lg">
                    <input type="text"
                        className=" h-[100%] w-[95%] bg-transparent outline-none  px-5 text-lg text-white"
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={message}
                    />
                    <button
                        style={glassEffectStyle}
                        onClick={send_message}
                        className="rounded-full p-1"
                    >
                        <Image
                            src='/message.png'
                            alt="message.png"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

            </div>

        </div>
    )
};


