import admin from "firebase-admin";
import initializeFirebaseAdmin from "@/helpers/adminHelper";

export async function subscribe(registrationTokens: string, channel: string) {
    initializeFirebaseAdmin();
    const response = await admin.messaging().subscribeToTopic(registrationTokens, channel);
    const db = admin.firestore();

    if (response.failureCount > 0) {
        console.log(response.errors)
    } else {
        const docRef = db.collection('channels').doc(channel)
        await docRef.set({ users: admin.firestore.FieldValue.arrayUnion(registrationTokens) }, { merge: true });
    }
}



export async function unSubscribe(registrationTokens: string, channel: string) {

    initializeFirebaseAdmin();
    const response = await admin.messaging().unsubscribeFromTopic(registrationTokens, channel);
    const db = admin.firestore();


    if (response.failureCount > 0) {
        console.log(response.errors)
    } else {
        const docRef = db.collection('channels').doc(channel)
        await docRef.update({ users: admin.firestore.FieldValue.arrayRemove(registrationTokens) },);
    }
}

