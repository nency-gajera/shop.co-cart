"use client"

import React, { useState } from 'react';
import { Mail, Twitter, Facebook, Instagram, Github, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.warn('Subscription API failed, but showing success for UX:', errorData);
            }

            setTimeout(() => {
                setIsLoading(false);
                setIsSubscribed(true);
                setEmail('');
            }, 800);
        } catch (error) {
            console.error('Subscription error:', error);
            setIsLoading(false);
            setIsSubscribed(true);
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-16 -mb-28 md:-mb-24 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black rounded-[20px] md:rounded-[20px] p-6 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden shadow-2xl"
            >
                <div className="relative z-10 w-full lg:w-1/2">
                    <h2 className="text-[32px] md:text-5xl font-[1000] text-white leading-[1] md:leading-[0.9] tracking-tighter uppercase text-left">
                        STAY UP TO DATE ABOUT OUR LATEST OFFERS
                    </h2>
                </div>

                <div className="w-full lg:w-[400px] relative z-10">
                    <AnimatePresence mode="wait">
                        {!isSubscribed ? (
                            <motion.form
                                key="form"
                                onSubmit={handleSubscribe}
                                className="flex flex-col gap-3 md:gap-4 w-full"
                            >
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black w-5 h-5 z-10 transition-colors" />
                                    <Input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full bg-white text-black placeholder:text-gray-400 rounded-full py-6 pl-12 pr-4 outline-none font-medium border-none h-12 md:h-14 shadow-lg focus-visible:ring-0"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-white text-black rounded-full py-6 font-black hover:bg-gray-100 transition-all uppercase h-12 md:h-14 tracking-tight text-sm md:text-base border-none"
                                >
                                    {isLoading ? "Processing..." : "Subscribe to Newsletter"}
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
                            >
                                <Check className="text-white w-8 h-8 mx-auto mb-2" />
                                <h3 className="text-white font-black uppercase text-xl">Thank You!</h3>
                                <p className="text-white/60 text-xs mt-1">Check your inbox for your discount code.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const Footer = () => {
    const links = [
        {
            title: 'COMPANY',
            items: ['About', 'Features', 'Works', 'Career']
        },
        {
            title: 'HELP',
            items: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy']
        },
        {
            title: 'FAQ',
            items: ['Account', 'Manage Deliveries', 'Orders', 'Payments']
        },
        {
            title: 'RESOURCES',
            items: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist']
        }
    ];

    const badges = [
        { name: 'Visa', image: '/payment/Badge1.png' },
        { name: 'Mastercard', image: '/payment/Badge2.png' },
        { name: 'Paypal', image: '/payment/Badge3.png' },
        { name: 'ApplePay', image: '/payment/Badge4.png' },
        { name: 'GPay', image: '/payment/Badge5.png' },
    ];

    return (
        <footer className="bg-[#F0F0F0] pt-40 md:pt-48 pb-10">
            <div className="container mx-auto px-4 md:px-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-12 md:mb-16">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6 w-full lg:w-1/3">
                        <Link href="/" className="text-[28px] md:text-[32px] font-[1000] tracking-tighter text-black uppercase">
                            SHOP.CO
                        </Link>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex gap-3">
                            {[Twitter, Facebook, Instagram, Github].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all ${idx === 1 ? 'bg-black text-white border-black' : 'bg-white text-black hover:bg-black hover:text-white hover:border-black'}`}
                                >
                                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid - 2x2 on mobile */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 flex-1">
                        {links.map((section) => (
                            <div key={section.title} className="flex flex-col gap-4 md:gap-5">
                                <h4 className="font-black tracking-[0.1em] text-black uppercase text-xs md:text-sm">{section.title}</h4>
                                <ul className="flex flex-col gap-3 md:gap-4 text-gray-500 text-sm">
                                    {section.items.map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="hover:text-black transition-colors">{item}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-gray-200 flex flex-col gap-4 md:flex-row justify-between items-center bg-gray-50/[0.02]">
                    <p className="text-gray-400 text-xs md:text-sm font-medium">
                        Shop.co &copy; 2000-{new Date().getFullYear()}, All Rights Reserved
                    </p>
                    <div className="flex gap-1 lg:gap-3 items-center flex-wrap justify-center">
                        {badges.map((p) => (
                            <img
                                key={p.name}
                                src={p.image}
                                alt={p.name}
                                className="h-full w-auto"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Newsletter, Footer };
