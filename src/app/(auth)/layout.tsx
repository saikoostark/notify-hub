'use client';

import { analytics, auth } from "@/firebase";
import useFcmToken from "@/hooks/useFcmToken";
import { logEvent } from "firebase/analytics";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const { fcmToken, notificationPermissionStatus } = useFcmToken();

    useEffect(() => {

        if (user) {
            // console.log(user.metadata.lastSignInTime, user.metadata.creationTime, user.metadata.lastSignInTime === user.metadata.creationTime)
            if (analytics && user.metadata.lastSignInTime === user.metadata.creationTime) {
                logEvent(analytics, 'first_time_login');

                async function loginNotification() {
                    if (notificationPermissionStatus !== 'granted')
                        return;
                    const jwt_token = await user!.getIdToken();
                    await fetch('/api/notifications/', {
                        method: 'POST',
                        body: JSON.stringify({
                            fcmToken: fcmToken,
                            token: jwt_token
                        }),
                    });

                };

                loginNotification();
            }
            router.push('/channels');
        }
    }, [user])

    return (
        <>
            {!loading && !user && children}
        </>
    );
}
