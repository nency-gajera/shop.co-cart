"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const stylesList = [
    { name: 'Casual', image: '/styles/style1.png', grid: 'col-span-1 md:col-span-2 lg:col-span-1', href: '/category/casual' },
    { name: 'Formal', image: '/styles/style2.png', grid: 'col-span-1 md:col-span-2 lg:col-span-2', href: '/category/formal' },
    { name: 'Party', image: '/styles/style3.png', grid: 'col-span-1 md:col-span-2 lg:col-span-2', href: '/category/party' },
    { name: 'Gym', image: '/styles/style4.png', grid: 'col-span-1 md:col-span-2 lg:col-span-1', href: '/category/gym' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const DressStyle = () => {
    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[#F0F0F0] rounded-[32px] md:rounded-[40px] px-6 py-12 md:p-16 lg:p-20 relative overflow-hidden"
                >
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 pointer-events-none" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-[32px] md:text-5xl font-black text-center mb-10 md:mb-16 uppercase tracking-tighter text-black leading-[0.9]"
                    >
                        BROWSE BY DRESS STYLE
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                    >
                        {stylesList.map((style) => (
                            <Link
                                key={style.name}
                                href={style.href}
                                className={`block ${style.grid} transition-transform hover:scale-[0.99] active:scale-[0.98]`}
                            >
                                <motion.div
                                    variants={itemVariants}
                                    className="relative h-[190px] md:h-[289px] rounded-2xl md:rounded-[28px] overflow-hidden bg-white w-full group shadow-sm"
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        src={style.image}
                                        alt={style.name}
                                        className="w-full h-full object-cover object-center md:object-right select-none"
                                    />
                                    <div className="absolute top-5 left-5 md:top-8 md:left-8 z-10">
                                        <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight leading-none">{style.name}</h3>
                                    </div>
                                    {/* Hover overlay shadow for better depth */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default DressStyle;
