'use client';

import { firebaseApp } from '@/firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useState, useEffect } from 'react';

export default function FcmChecker() {
    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    const [, setNotificationToken] = useState<string | null>(null);

    useEffect(() => {
        // Ensure the code runs in the browser only
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);

            getToken(messaging, { vapidKey: vapidKey })
                .then((currentToken) => {
                    if (currentToken) {
                        setNotificationToken(currentToken);
                    }
                })
                .catch((err: Error) => {
                    console.error('Error retrieving token:', err);
                });

            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground push notification received:', payload);
            });

            return () => {
                unsubscribe();
            };
        }
    }, []);


    return null;
}
