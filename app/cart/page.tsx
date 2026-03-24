"use client";

import React from 'react';
import { Trash2, Minus, Plus, ChevronRight, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const { user } = useAuth();
    const pathname = usePathname();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = subtotal > 0 ? subtotal * 0.2 : 0;
    const deliveryFee = subtotal > 0 ? 15 : 0;
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 md:px-16 pt-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-black font-medium">Cart</span>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
                        Your Cart
                    </h1>
                    {user && (
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Shopping as</span>
                            <span className="text-sm font-bold text-black uppercase tracking-tighter">{user.name}</span>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-1 border border-gray-100 rounded-[24px] p-4 md:p-8 flex flex-col gap-6 shadow-sm">
                            <AnimatePresence initial={false}>
                                {cartItems.map((item, idx) => (
                                    <motion.div
                                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className={`flex gap-4 md:gap-6 pb-6 md:pb-8 ${idx !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                                    >
                                        <div className="w-24 h-24 md:w-36 md:h-36 bg-[#F0EEED] rounded-xl md:rounded-2xl overflow-hidden shrink-0 transform transition-transform hover:scale-105">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="flex flex-col gap-0.5 min-w-0">
                                                    <h3 className="font-black text-base md:text-2xl text-black uppercase tracking-tight leading-tight truncate">{item.name}</h3>
                                                    <div className="flex flex-col gap-0.5 mt-1">
                                                        {item.selectedSize && <p className="text-[10px] md:text-sm font-medium text-black">Size: <span className="text-gray-400">{item.selectedSize}</span></p>}
                                                        {item.selectedColor && (
                                                            <div className="flex items-center gap-1.5">
                                                                <p className="text-[10px] md:text-sm font-medium text-black">Color:</p>
                                                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.selectedColor }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-600 transition-colors p-1.5 md:p-2 bg-red-50 rounded-lg md:rounded-xl shrink-0"
                                                >
                                                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                                </motion.button>
                                            </div>

                                            <div className="flex justify-between items-end md:items-center mt-2 md:mt-0">
                                                <span className="text-xl md:text-2xl font-black text-black tracking-tighter">${item.price}</span>
                                                <div className="bg-[#F0F0F0] flex items-center rounded-full px-3 md:px-5 py-1.5 md:py-3 gap-3 md:gap-6 border border-gray-100 scale-90 md:scale-100 origin-right">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-black text-gray-400 transition-colors"><Minus className="w-3.5 h-3.5 md:w-5 md:h-5" /></button>
                                                    <span className="font-black text-sm md:text-lg min-w-[15px] md:min-w-[20px] text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-black text-gray-400 transition-colors"><Plus className="w-3.5 h-3.5 md:w-5 md:h-5" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[400px]">
                            <div className="border border-gray-100 rounded-[24px] p-8 flex flex-col gap-8 shadow-sm sticky top-32 bg-white">
                                <h2 className="text-2xl font-black text-black uppercase tracking-tight leading-none">Order Summary</h2>

                                <div className="flex flex-col gap-4 border-b border-gray-100 pb-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">Subtotal</span>
                                        <span className="text-black font-black text-xl tracking-tight">${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">Discount (-20%)</span>
                                        <span className="text-red-500 font-black text-xl tracking-tight">-${discount.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">Delivery Fee</span>
                                        <span className="text-black font-black text-xl tracking-tight">${deliveryFee}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-black font-black text-3xl uppercase tracking-tighter leading-none">Total</span>
                                    <span className="text-black font-black text-4xl tracking-tighter leading-none">${total.toFixed(0)}</span>
                                </div>

                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                                        <Input
                                            placeholder="Add promo code"
                                            className="w-full bg-gray-50 border-none rounded-full py-8 pl-14 pr-6 font-bold focus-visible:ring-1 focus-visible:ring-black h-14"
                                        />
                                    </div>
                                    <Button className="bg-black text-white rounded-full px-8 py-7 font-black uppercase text-sm hover:scale-105 transition-all shadow-md shadow-black/10 h-14 leading-none">
                                        Apply
                                    </Button>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full bg-black text-white rounded-full py-9 font-black text-xl uppercase tracking-widest hover:bg-black/90 transition-all group shadow-xl shadow-black/20 h-20 leading-none">
                                        Go to Checkout <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-gray-50 rounded-[40px] border border-dashed border-gray-200 flex flex-col items-center gap-8 shadow-inner"
                    >
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <div className="max-w-sm">
                            <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-4 leading-none">Your cart is empty</h2>
                            <p className="text-gray-400 font-medium mb-8">
                                {!user
                                    ? "Login to see your saved items and continue where you left off."
                                    : "Looks like you haven't added anything to your cart yet. Browse our collections and find something you love!"}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link href="/">
                                <Button className="bg-black text-white rounded-full px-12 py-7 font-black uppercase tracking-widest transition-all hover:scale-110 active:scale-95 shadow-xl shadow-black/10 h-16 leading-none">
                                    Start Shopping
                                </Button>
                            </Link>
                            {!user && (
                                <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>
                                    <Button variant="outline" className="rounded-full px-12 py-7 font-black uppercase tracking-widest transition-all hover:bg-black hover:text-white border-black h-16 leading-none">
                                        Login to Cart
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
