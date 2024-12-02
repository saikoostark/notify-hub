"use client";


import { firestoreDB } from "@/firebase";
import { collection } from 'firebase/firestore';
import React, { useState } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image'


export default function Topics() {

    const [channelName, setChannelName] = useState('');

    // const [deleteConfirmation, setDeleteConfirmation] = useState(false);


    const [value, loading] = useCollection(collection(firestoreDB, 'channels'));


    async function submit_form() {
        const name = channelName;

        if (name.length === 0)
            return;

        setChannelName('');
        // const docRef = doc(collection(firestoreDB, "channels"), name);
        // await setDoc(docRef, { users: [] }, { merge: true });

        await fetch('/api/channels', {
            method: 'POST',
            body: JSON.stringify({
                channel: name
            })
        });

    }


    async function delete_channel(doc_id: string) {
        // const docRef = doc(collection(firestoreDB, "channels"), doc_id);
        // await deleteDoc(docRef);
        // const dataRef = ref(realtimeDB, `channels/${doc_id}`);
        // await remove(dataRef);
        await fetch('/api/channels', {
            method: 'DELETE',
            body: JSON.stringify({
                channel: doc_id
            })
        });
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

    if (loading)
        return null;
    else
        return (
            <div className="h-[100vh] w-[100vw] md:flex md:flex-row bg-wallpaper bg-scroll bg-cover">

                <div className="channels text-lg  w-[100vw] h-[100vh] flex flex-col gap-y-5 p-5 overflow-y-auto md:w-[25vw] md:text-lg md:items-stretch" >
                    {
                        !loading && value?.docs?.map(my_doc => {
                            return (

                                <div style={glassEffectStyle} key={my_doc.id} className="flex items-center gap-x-3 rounded-lg p-2">
                                    <Image src="/people.png"
                                        width={45}
                                        height={45}
                                        alt={my_doc.id}
                                        className="border rounded-full p-2 " />
                                    <h1 title={my_doc.id} className="line-clamp-1 text-ellipsis overflow-hidden w-[75%] md:w-[50%]" >{my_doc.id}</h1>

                                    <button onClick={() => delete_channel(my_doc.id)}>
                                        <Image src="/delete.png"
                                            width={25}
                                            height={25}
                                            alt={my_doc.id}
                                            className="rounded-full" />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>


                <div className="absolute top-1/2 left-1/2 md:relative
                -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0
                md:top-0 md:left-0 md:h-[100vh] flex items-center justify-center  w-[60%] md:w-[100%]">

                    <div style={glassEffectStyle} className="form w-[100%] md:w-fit p-5 bg-emerald-950 flex flex-col items-center gap-y-5 rounded-md">

                        <div className="inputs w-[100%]">
                            <input type="text" placeholder="channel name" value={channelName}
                                className="w-[100%] md:w-96 p-2 bg-slate-100 outline-none border rounded-md text-black"
                                onChange={(e) => setChannelName(e.target.value)} />
                        </div>

                        <button
                            style={glassEffectStyle}
                            className="p-2 bg-slate-600 border rounded-md"
                            onClick={submit_form}
                        >Add Channel</button>
                    </div>

                </div>


            </div>
        )
}

export const dynamic = "force-dynamic";
