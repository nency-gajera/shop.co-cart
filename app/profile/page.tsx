"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Mail, LogOut, Package, Heart, MapPin, Settings } from 'lucide-react';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    if (!user) {
        if (typeof window !== 'undefined') {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
        return null;
    }

    const menuItems = [
        { icon: Package, label: 'My Orders', description: 'View and track your orders' },
        { icon: Heart, label: 'Wishlist', description: 'Items you have saved' },
        { icon: MapPin, label: 'Shipping Address', description: 'Manage your delivery addresses' },
        { icon: Settings, label: 'Settings', description: 'Update profile and notification preferences' },
    ];

    return (
        <div className="bg-[#F0F0F0]/30 min-h-screen py-20 pb-40">
            <div className="container mx-auto px-4 md:px-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-1/3 flex flex-col gap-6"
                    >
                        <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                            {/* Decorative banner */}
                            <div className="absolute top-0 left-0 w-full h-24 bg-black/5" />

                            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-6 relative z-10 border-4 border-white shadow-lg overflow-hidden">
                                <span className="text-white text-3xl font-black uppercase">{user.name.charAt(0)}</span>
                            </div>

                            <div className="relative z-10 w-full">
                                <h1 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">{user.name}</h1>
                                <div className="flex items-center justify-center gap-2 text-gray-400 font-bold mb-8">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>

                                <Button
                                    onClick={logout}
                                    variant="outline"
                                    className="w-full rounded-full py-8 font-black uppercase text-sm border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all transition-colors transition-transform transition-duration-300 h-14"
                                >
                                    <LogOut className="mr-2 w-5 h-5" />
                                    Logout Account
                                </Button>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="bg-black text-white rounded-[24px] p-8 flex gap-4 shadow-xl">
                            <div className="flex-1 text-center">
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Orders</p>
                                <p className="text-2xl font-black">12</p>
                            </div>
                            <div className="w-[1px] bg-white/10" />
                            <div className="flex-1 text-center">
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Points</p>
                                <p className="text-2xl font-black">450</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Menu */}
                    <div className="flex-1 flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[32px] p-4 p-md-8 shadow-2xl shadow-black/5 border border-gray-100"
                        >
                            <h2 className="text-xl font-black text-black uppercase tracking-widest mb-6 px-4">Account Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {menuItems.map((item, idx) => (
                                    <motion.button
                                        key={item.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-5 p-6 rounded-[24px] hover:bg-gray-50 transition-all text-left border border-transparent hover:border-gray-100 group"
                                    >
                                        <div className="w-12 h-12 bg-[#F0F0F0] rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-black text-black uppercase tracking-tight text-lg">{item.label}</p>
                                            <p className="text-sm text-gray-400 font-medium">{item.description}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex gap-4 p-6 bg-blue-50/50 rounded-[24px] border border-blue-100 items-start">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 mt-1">
                                <h4 className="font-black text-blue-900 uppercase tracking-tight">Security Tip</h4>
                                <p className="text-sm text-blue-700/80 font-medium">Keep your account secure by using a strong password and updating it regularly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
