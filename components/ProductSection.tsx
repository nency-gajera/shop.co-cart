"use client";

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductSectionProps {
    title: string;
    products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto px-4 md:px-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[32px] md:text-5xl lg:text-6xl font-[1000] text-center mb-10 md:mb-16 uppercase tracking-tighter text-black leading-none"
                >
                    {title}
                </motion.h2>

                {/* Layout - Horizontal scroll on mobile, 4-col grid on lg */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory no-scrollbar"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            className="min-w-[200px] sm:min-w-[280px] md:min-w-0 snap-center"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex justify-center mt-12 md:mt-20 px-2"
                >
                    <Link href="/search">
                        <Button
                            variant="outline"
                            className="px-12 md:px-24 py-6 md:py-8 rounded-full font-black uppercase text-xs md:text-sm tracking-widest transition-all w-full md:w-auto bg-white text-black border-[1.5px] border-gray-100/80 h-14 md:h-18 flex items-center justify-center gap-2 group"
                        >
                            View All
                        </Button>
                    </Link>
                </motion.div>

                {/* Bottom Separator line to match mockup */}
                <div className="mt-16 md:mt-24 h-px w-full bg-gray-100 opacity-60 flex justify-center container mx-auto" />
            </div>
        </section>
    );
};

export default ProductSection;
