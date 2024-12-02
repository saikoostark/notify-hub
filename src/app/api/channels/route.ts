import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { subscribe, unSubscribe } from "@/helpers/notificationSubscribtion";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  initializeFirebaseAdmin()
  try {
    const { token, channel, subscribtion } = await req.json();
    if (subscribtion) {
      await subscribe(token, channel);
    } else {

      await unSubscribe(token, channel);
    }

    // Respond with a success message
    return NextResponse.json({ message: 'Data received successfully' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
