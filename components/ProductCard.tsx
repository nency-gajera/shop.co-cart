"use client";

import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        addToCart(product, 1, product.color, product.size);
    };

    // Calculate stars
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    return (
        <Link href={`/product/${product.id}`} className="block group">
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-2.5 md:gap-4"
            >
                {/* Image Container */}
                <div className="bg-[#F0EEED] rounded-[20px] md:rounded-[24px] overflow-hidden aspect-square relative shadow-sm group-hover:shadow-md transition-shadow">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Quick Add Overlay - Desktop Only */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center backdrop-blur-[1px]">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="w-full px-4"
                        >
                            <Button
                                onClick={handleAddToCart}
                                className="w-full rounded-full py-6 bg-white text-black hover:bg-black hover:text-white transition-all font-black uppercase tracking-widest text-xs h-12 shadow-xl"
                            >
                                {user ? "Quick Add +" : "Join to shop"}
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1.5 px-1">
                    <h3 className="font-black text-sm md:text-lg lg:text-xl text-black leading-tight line-clamp-2 md:line-clamp-1 group-hover:text-gray-700 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="flex gap-0.5 text-[#FFC633]">
                            {[...Array(5)].map((_, i) => {
                                if (i < fullStars) {
                                    return <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#FFC633] stroke-none" />;
                                } else if (i === fullStars && hasHalfStar) {
                                    return <StarHalf key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#FFC633] stroke-none" />;
                                }
                                return <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-none stroke-gray-300" />;
                            })}
                        </div>
                        <span className="text-[11px] md:text-sm font-medium text-gray-500">
                            {product.rating}/<span className="text-gray-400">5</span>
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 md:gap-3 mt-1">
                        <span className="font-black text-lg md:text-2xl text-black">
                            ${product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-gray-400 line-through font-bold text-lg md:text-2xl">
                                ${product.originalPrice}
                            </span>
                        )}
                        {product.discount && (
                            <span className="bg-red-50 text-red-500 text-[10px] md:text-xs font-black px-2 py-1 md:px-3 rounded-full uppercase tracking-tighter shadow-sm animate-pulse-slow">
                                {product.discount}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
