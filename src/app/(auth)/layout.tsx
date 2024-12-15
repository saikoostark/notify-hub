'use client';

import { analytics, auth } from "@/firebase";
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

    useEffect(() => {

        if (user) {
            console.log(user.metadata.lastSignInTime, user.metadata.creationTime, user.metadata.lastSignInTime === user.metadata.creationTime)
            if (analytics && user.metadata.lastSignInTime === user.metadata.creationTime) {
                logEvent(analytics, 'first_time_login');
                console.log('i am logging here to first signin');
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