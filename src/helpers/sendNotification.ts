import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import initializeFirebaseAdmin from "@/helpers/adminHelper";
// import { subscribe, unSubscribe } from "./notificationSubscribtion";



export async function sendNotification(sender: string, title: string, body: string, channel?: string, link?: string) {
    initializeFirebaseAdmin()

    // console.log('new notification ', title, body, sender);
    let payload: Message | null = {
        notification: {
            title,
            body
        },
        token: sender
    };

    if (channel) {
        payload = {
            ...payload,
            topic: channel
        }
    }

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
        // await unSubscribe(sender, channel);
        await admin.messaging().send(payload)
        // await subscribe(sender, channel);
    } catch (error) {
        console.log(error)
    }
}
