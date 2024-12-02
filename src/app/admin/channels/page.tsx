"use client";


import { firestoreDB, realtimeDB } from "@/firebase";
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useState } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image'
import { ref, remove } from "firebase/database";


export default function Topics() {

    const [channelName, setChannelName] = useState('');

    // const [deleteConfirmation, setDeleteConfirmation] = useState(false);


    const [value, loading] = useCollection(collection(firestoreDB, 'channels'));

    async function submit_form() {
        const name = channelName;

        if (name.length === 0)
            return;

        setChannelName('');
        const docRef = doc(collection(firestoreDB, "channels"), name);
        await setDoc(docRef, { users: [] }, { merge: true });

    }


    async function delete_channel(doc_id: string) {
        const docRef = doc(collection(firestoreDB, "channels"), doc_id);
        await deleteDoc(docRef);
        const dataRef = ref(realtimeDB, `channels/${doc_id}`);
        await remove(dataRef);
    }


    return (
        <div className="h-[100vh] flex">

            <div className="channels max-h-[100vh] flex flex-col  bg-stone-800 gap-y-5 py-5 overflow-y-auto px-5 w-[25vw]" >
                {
                    !loading && value?.docs?.map(my_doc => {
                        return (

                            <div key={my_doc.id} className="flex items-center gap-x-3 bg-indigo-900 rounded-lg p-2">
                                <Image src="/people.png"
                                    width={45}
                                    height={45}
                                    alt={my_doc.id}
                                    className="border rounded-full p-2" />
                                <h1 title={my_doc.id} className="line-clamp-1	 text-ellipsis overflow-hidden w-[50%]" >{my_doc.id}</h1>

                                <button onClick={() => delete_channel(my_doc.id)}>
                                    <Image src="/delete.png"
                                        width={25}
                                        height={25}
                                        alt={my_doc.id}
                                        className="rounded-full " />
                                </button>
                            </div>
                        )
                    })
                }
            </div>


            <div className="h-[100vh] flex items-center justify-center w-[100%] ">

                <div className="form  p-5 bg-emerald-950 flex flex-col items-center gap-y-5 rounded-md">

                    <div className="inputs w-[100%]">
                        <input type="text" placeholder="channel name" value={channelName}
                            className="w-96 p-2 bg-slate-600 outline-none border rounded-md"
                            onChange={(e) => setChannelName(e.target.value)} />
                    </div>

                    <button
                        className="p-2 bg-slate-600 border rounded-md"
                        onClick={submit_form}
                    >Add Channel</button>
                </div>

            </div>


        </div>
    )
}

export const dynamic = "force-dynamic";
