import admin from "firebase-admin";
import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { DecodedIdToken } from "firebase-admin/auth";

export async function subscribeToChannel(jwt_decoded_token: DecodedIdToken, channel: string) {
    initializeFirebaseAdmin();

    const db = admin.firestore();
    const docRef = db.collection('channels').doc(channel)
    await docRef.set({ users: admin.firestore.FieldValue.arrayUnion(jwt_decoded_token.uid) }, { merge: true });

    // try {
    // } catch (error) {
    //     console.log('there is error here');
    // }
}



export async function unSubscribeToChannel(jwt_decoded_token: DecodedIdToken, channel: string) {

    initializeFirebaseAdmin();

    const db = admin.firestore();
    const docRef = db.collection('channels').doc(channel)
    await docRef.update({ users: admin.firestore.FieldValue.arrayRemove(jwt_decoded_token.uid) },);
}

