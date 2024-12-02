import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";



export async function POST(req: NextRequest) {
    initializeFirebaseAdmin()
    try {
        const { channel } = await req.json();
        await admin.firestore().collection("channels").doc(channel).set({ users: [] }, { merge: true });
        return NextResponse.json({ message: 'Data received successfully' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}


export async function DELETE(req: NextRequest) {
    initializeFirebaseAdmin()
    try {
        const { channel } = await req.json();

        await admin.firestore().collection("channels").doc(channel).delete();
        await admin.database().ref(`channels/${channel}`).remove();

        return NextResponse.json({ message: 'Data received successfully' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}
