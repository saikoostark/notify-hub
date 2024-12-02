import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { sendNotification } from "@/helpers/sendNotification";
import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    initializeFirebaseAdmin()

    const { text, sender, channel } = await req.json()

    if (channel && text) {
        await admin.database().ref(`channels/${channel}`).push().set({
            sender: sender,
            text: text
        }, a => {
            if (!a) {
                sendNotification(sender, `new message in ${channel}`, text, channel, `/channels/${channel}`)
            }
        })
    }
    return NextResponse.json({ message: 'Data received successfully' });


}
