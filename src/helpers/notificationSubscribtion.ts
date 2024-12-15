import admin from "firebase-admin";
import initializeFirebaseAdmin from "@/helpers/adminHelper";
import { validateToken } from "./jwtHelper";

export async function subscribeToNotification(jwt_token: string, registrationTokens: string, channel: string) {
    initializeFirebaseAdmin();


    const decoded_token = await validateToken(jwt_token);
    if (decoded_token === null)
        return false;

    const response = await admin.messaging().subscribeToTopic(registrationTokens, channel);
    const db = admin.firestore();

    if (response.failureCount > 0) {
        console.log(response.errors)
    } else {
        const docRef = db.collection('channels_notifications').doc(channel)
        await docRef.set({ users: admin.firestore.FieldValue.arrayUnion(registrationTokens) }, { merge: true });
    }
}



export async function unSubscribeToNotification(jwt_token: string, registrationTokens: string, channel: string) {

    initializeFirebaseAdmin();

    const decoded_token = await validateToken(jwt_token);
    if (decoded_token === null)
        return false;

    const response = await admin.messaging().unsubscribeFromTopic(registrationTokens, channel);
    const db = admin.firestore();


    if (response.failureCount > 0) {
        console.log(response.errors)
    } else {
        const docRef = db.collection('channels_notifications').doc(channel)
        await docRef.update({ users: admin.firestore.FieldValue.arrayRemove(registrationTokens) },);
    }
}

