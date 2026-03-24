"use client";

import React, { useRef } from 'react';
import { motion, motionValue, useTransform, useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) => {
    const count = motionValue(0);
    const rounded = useTransform(count, (latest: number) => Math.round(latest).toLocaleString());
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    React.useEffect(() => {
        if (inView) {
            animate(count, value, {
                duration: 2.5,
                ease: "easeOut",
            });
        }
    }, [inView, value, count]);

    return (
        <div ref={ref} className="text-left">
            <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-1">
                <motion.span>{rounded}</motion.span>{suffix}
            </h3>
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">{label}</p>
        </div>
    );
};

const Hero = () => {
    return (
        <section className="bg-[#F2F0F1] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center pt-8 md:pt-0">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 z-10 py-6 md:py-16 md:pb-20 text-left"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[32px] md:text-[40px] lg:text-[64px] xl:text-[72px] font-black leading-[0.9] mb-4 md:mb-5 text-black uppercase tracking-tighter"
                    >
                        FIND CLOTHES <br className="hidden lg:block" /> THAT MATCHES <br className="hidden lg:block" /> YOUR STYLE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-500 text-sm md:text-[13px] lg:text-base leading-relaxed mb-6 md:mb-8 max-w-[545px] font-medium"
                    >
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-black text-white px-10 md:px-16 py-4 md:py-5 rounded-full font-black text-base md:text-lg hover:bg-black/90 transition-all mb-8 md:mb-12 w-full md:w-auto uppercase tracking-wider h-14 md:h-16 shadow-xl shadow-black/10"
                    >
                        Shop Now
                    </motion.button>

                    {/* Stats Layout - 2x1 grid on mobile, horizontal on md */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-2 lg:grid-cols-3 items-center justify-start gap-y-6 md:gap-x-8 lg:gap-x-12 text-black max-w-[400px] md:max-w-none md:flex md:flex-nowrap"
                    >
                        <AnimatedCounter value={200} label="International Brands" />
                        <div className="w-px h-12 bg-gray-200 hidden lg:block"></div>
                        <AnimatedCounter value={2000} label="High-Quality Products" />
                        <div className="w-px h-12 bg-gray-200 hidden xl:block"></div>
                        <div className="col-span-2 text-center md:text-left flex flex-col items-center md:items-start md:col-span-1 border-t border-gray-100 pt-6 md:border-none md:pt-0">
                            <AnimatedCounter value={30000} label="Happy Customers" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Image Content */}
                <div className="w-full md:w-1/2 relative flex justify-end items-end self-end mt-8 md:mt-0 px-0 md:pl-4">
                    <div className="relative w-full h-full flex justify-end overflow-visible">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            src="/hero-image1.jpg"
                            alt="Fashion Models"
                            className="w-full max-w-[450px] lg:max-w-[650px] h-auto object-contain object-bottom z-10 block"
                        />

                        {/* BIG Star (Right) */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{
                                delay: 1,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 80
                            }}
                            className="absolute top-[10%] right-[5%] text-black z-20"
                        >
                            <motion.svg
                                animate={{
                                    scale: [1, 1.15, 1],
                                    opacity: [1, 0.9, 1],
                                    rotate: [0, 15, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                width="76" height="76" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-[76px] md:h-[76px] lg:w-[104px] lg:h-[104px]"
                            >
                                <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z" fill="black" />
                            </motion.svg>
                        </motion.div>

                        {/* SMALL Star (Left) */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: 45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{
                                delay: 1.3,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 80
                            }}
                            className="absolute top-[40%] left-[5%] text-black z-20"
                        >
                            <motion.svg
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1],
                                    rotate: [0, -15, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-16 md:h-16"
                            >
                                <path d="M50 0 Q50 50 100 50 Q50 50 50 100 Q50 50 0 50 Q50 50 50 0 Z" fill="black" />
                            </motion.svg>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background elements decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 blur-[120px] pointer-events-none -z-10" />
        </section>
    );
};

export default Hero;
