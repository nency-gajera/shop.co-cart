"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            // Store the path they were trying to access to redirect them back after login
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [user, isLoading, router, pathname]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="font-black uppercase tracking-tighter text-sm">Authenticating...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
