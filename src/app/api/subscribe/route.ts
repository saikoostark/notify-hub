import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { subscribeToChannel, unSubscribeToChannel } from "@/helpers/channelSubscribtion";
import { validateToken } from "@/helpers/jwtHelper";
// import { subscribeToNotification, unSubscribeToNotification } from "@/helpers/notificationSubscribtion";


import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  initializeFirebaseAdmin()

  try {
    const { token, channel, subscribtion } = await req.json();
    const decoded_token = await validateToken(token);
    if (decoded_token === null)
      return NextResponse.json({ 'error': 'invalid jwt token' }, { status: 400 });

    if (subscribtion) {
      await subscribeToChannel(decoded_token, channel);
    } else {

      await unSubscribeToChannel(decoded_token, channel);
    }

    // Respond with a success message
    return NextResponse.json({ message: 'Data received successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
