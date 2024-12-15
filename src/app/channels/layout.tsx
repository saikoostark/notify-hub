'use client';
import { auth, firebaseApp } from "@/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
// import { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Notification from "@/components/notification";


type NotificationType = {
    active: boolean;
    title: string;
    body: string;
}



export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const [user, authLoading] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    const logoutButtonRef = useRef<HTMLButtonElement>(null);

    const [notificationContent, setNotificationContent] = useState<NotificationType>({
        active: false,
        title: '',
        body: ''
    });


    async function handleLogout() {
        if (logoutButtonRef.current) {
            logoutButtonRef.current.disabled = true;
        }
        if (await signOut()) {
            router.push('/login');
        }
    }


    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading])


    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground push notification received:', payload);
                setNotificationContent({ active: true, title: payload.notification?.title ?? '', body: payload.notification?.body ?? '' });

                timeout = setTimeout(() => {
                    setNotificationContent({ active: false, title: '', body: '' });
                }, 10000);
            });
            return () => {
                unsubscribe();
                if (timeout)
                    clearTimeout(timeout);
            };
        }
    }, []);

    if (!authLoading && user)
        return (
            <>
                {notificationContent.active && <Notification title={notificationContent.title} body={notificationContent.body} />}
                <div className="container flex flex-col h-[100vh]  w-[100vw]">
                    <div className="grow bg-wallpaper">
                        <div className="header h-[7vh] flex justify-between items-center px-6">
                            <p className="text-3xl">ChatDose</p>
                            <div className="nav-bar">
                                <button ref={logoutButtonRef}
                                    onClick={handleLogout}
                                    className="p-2 bg-gray-700 rounded-lg disabled:bg-gray-400"
                                >Logout</button>
                            </div>
                        </div>
                        <div className=" main h-[93vh]">
                            {children}
                        </div>
                    </div>
                </div>
            </>
        );
}
