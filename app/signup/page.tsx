"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Suspense } from 'react';

const SignupContent = () => {
    const { signup } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await signup(name, email, password);
            router.push(callbackURL);
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-32 flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-10 bg-white border border-gray-100 rounded-[32px] shadow-2xl overflow-hidden relative"
            >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-10 -mt-10 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full -ml-10 -mb-10 blur-3xl opacity-50" />

                <div className="relative text-center mb-10">
                    <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-4">
                        Creat Your Account
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Join SHOP.CO today and enjoy the best fashion deals.
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="bg-red-50 text-red-500 text-sm p-4 rounded-xl font-bold mb-6 border border-red-100 italic"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-black text-gray-500 uppercase ml-1">Full Name</label>
                        <Input
                            type="text"
                            required
                            placeholder="Type your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#F0F0F0] border-none rounded-full py-7 px-6 font-bold focus-visible:ring-1 focus-visible:ring-black h-14"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black text-gray-500 uppercase ml-1">Email Address</label>
                        <Input
                            type="email"
                            required
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#F0F0F0] border-none rounded-full py-7 px-6 font-bold focus-visible:ring-1 focus-visible:ring-black h-14"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black text-gray-500 uppercase ml-1">Password</label>
                        <Input
                            type="password"
                            required
                            placeholder="Choose a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#F0F0F0] border-none rounded-full py-7 px-6 font-bold focus-visible:ring-1 focus-visible:ring-black h-14"
                        />
                    </div>

                    <Button
                        disabled={isSubmitting}
                        className="w-full bg-black text-white rounded-full py-7 font-black text-lg mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase h-16 shadow-lg shadow-black/20"
                    >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                <div className="mt-8 text-center font-medium">
                    <span className="text-gray-500">Already a member? </span>
                    <Link
                        href={`/login?callbackUrl=${encodeURIComponent(callbackURL)}`}
                        className="text-black font-black hover:underline underline-offset-4 decoration-2"
                    >
                        Login Now
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center font-black uppercase tracking-tighter">Creating Account...</div>}>
            <SignupContent />
        </Suspense>
    );
}
