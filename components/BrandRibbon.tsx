"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BrandRibbon = () => {
    const brands = [
        { name: "Versace", path: "/brand/brand1.png" },
        { name: "Zara", path: "/brand/brand2.png" },
        { name: "Gucci", path: "/brand/brand3.png" },
        { name: "Prada", path: "/brand/brand4.png" },
        { name: "Calvin Klein", path: "/brand/brand5.png" },
    ];

    return (
        <div className="bg-black py-8 md:py-12 overflow-hidden">
            <div className="container mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-12 lg:gap-x-16 xl:gap-x-24 gap-y-8"
                >
                    {/* First row for mobile: 3 items */}
                    <div className="flex md:hidden items-center justify-center gap-8 w-full">
                        {brands.slice(0, 3).map((brand, idx) => (
                            <motion.img
                                key={brand.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                src={brand.path}
                                alt={brand.name}
                                className="h-4 sm:h-5 object-contain opacity-100 hover:brightness-125 transition-all"
                            />
                        ))}
                    </div>

                    {/* Second row for mobile: 2 items */}
                    <div className="flex md:hidden items-center justify-center gap-10 w-full mb-2">
                        {brands.slice(3).map((brand, idx) => (
                            <motion.img
                                key={brand.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx + 3) * 0.1, duration: 0.6 }}
                                src={brand.path}
                                alt={brand.name}
                                className="h-5 sm:h-6 object-contain opacity-100 hover:brightness-125 transition-all"
                            />
                        ))}
                    </div>

                    {/* Desktop View: Just one flexible row */}
                    <div className="hidden md:flex flex-wrap justify-between items-center gap-12 w-full lg:px-10">
                        {brands.map((brand, idx) => (
                            <motion.img
                                key={brand.name}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                whileHover={{ scale: 1.15, filter: "brightness(1.5)" }}
                                src={brand.path}
                                alt={brand.name}
                                className="h-6 md:h-8 lg:h-10 object-contain hover:scale-110 transition-transform cursor-pointer"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BrandRibbon;
