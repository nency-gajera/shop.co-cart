"use client"

import { useAuth } from '@/context/AuthContext';

const TopBanner = () => {
    const { user } = useAuth();

    if (user) return null;
    return (
        <div className="bg-black text-white text-center py-2.5 px-4 text-[11px] md:text-sm font-medium relative overflow-hidden group">
            <div className="container mx-auto">
                <p className="tracking-tight md:tracking-normal">
                    Sign up and get 20% off to your first order.{" "}
                    <a href="/signup" className="underline font-black hover:text-gray-300 transition-colors ml-1">
                        Sign Up Now
                    </a>
                </p>
                <button className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 hidden md:block opacity-50 hover:opacity-100 transition-opacity">
                    <span className="sr-only">Close</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Subtle animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shine_2s_infinite] pointer-events-none" />

            <style jsx>{`
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default TopBanner;
