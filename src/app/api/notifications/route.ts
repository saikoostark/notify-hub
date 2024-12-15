import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { validateToken } from "@/helpers/jwtHelper";
import { sendNotification } from "@/helpers/sendNotification";

import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    initializeFirebaseAdmin()

    try {
        const { token, fcmToken } = await req.json();
        const decoded_token = await validateToken(token);
        if (decoded_token === null)
            return NextResponse.json({ 'error': 'invalid jwt token' }, { status: 400 });

        if (fcmToken === null)
            return NextResponse.json({ 'error': 'invalid fcm token' }, { status: 400 });

        sendNotification(fcmToken, 'New Login', `Welcome ${decoded_token.email ?? 'lovely user'}`)
        // Respond with a success message
        return NextResponse.json({ message: 'Data received successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 400 });
    }
}
