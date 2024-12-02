import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { subscribe, unSubscribe } from "./notificationSubscribtion";



export async function sendNotification(sender: string, title: string, body: string, channel: string, link?: string) {
    initializeFirebaseAdmin()


    let payload: Message = {
        notification: {
            title,
            body,
        },
        topic: channel
    };

    if (link)
        payload = {
            ...payload,
            webpush: {
                fcmOptions: {
                    link,
                }
            },
        }

    try {
        await unSubscribe(sender, channel);
        const msg = await admin.messaging().send(payload)
        console.log(`that is the msg ${msg}`)
        await subscribe(sender, channel);
    } catch (error) {
        console.log(error)
    }
}
