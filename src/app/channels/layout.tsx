'use client';
import { auth } from "@/firebase";
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from "react";
// import { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const [user, authLoading] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    const logoutButtonRef = useRef<HTMLButtonElement>(null);

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


    if (!authLoading && user)
        return (
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
                    <div className="relative main h-[93vh]">
                        {children}
                    </div>
                </div>
            </div>
        );
}
