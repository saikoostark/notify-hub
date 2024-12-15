import admin from "firebase-admin";
import initializeFirebaseAdmin from "./adminHelper";


export async function validateToken(token: string) {
    initializeFirebaseAdmin();
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
