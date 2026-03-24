"use client";

import React, { useState } from 'react';
import { ChevronRight, CreditCard, Truck, ShieldCheck, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = subtotal > 0 ? subtotal * 0.2 : 0;
    const deliveryFee = subtotal > 0 ? (deliveryMethod === 'standard' ? 15 : 25) : 0;
    const total = subtotal - discount + deliveryFee;

    const handlePlaceOrder = () => {
        setStep(3);
        setTimeout(() => {
            clearCart();
            router.push('/');
        }, 3000);
    };

    if (step === 3) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-center gap-6"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Order Placed!</h1>
                    <p className="text-gray-500 max-w-sm">Thank you for your purchase. We've sent a confirmation email to {user?.email || 'your email'}. Redirecting you home...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="bg-white min-h-screen pb-20">
                <div className="container mx-auto px-4 md:px-16 pt-6">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                        <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-black font-medium">Checkout</span>
                    </div>

                    <div className="flex items-center justify-between mb-10">
                        <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
                            Checkout
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Side - Forms */}
                        <div className="flex-1 flex flex-col gap-10">
                            {/* Step Indicators */}
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-black' : 'text-gray-300'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2 ${step >= 1 ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-300'}`}>1</div>
                                    <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">Shipping</span>
                                </div>
                                <div className="h-0.5 w-12 bg-gray-100" />
                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-black' : 'text-gray-300'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-2 ${step >= 2 ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-300'}`}>2</div>
                                    <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">Payment</span>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex flex-col gap-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                                <MapPin className="w-6 h-6" /> Shipping Details
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">First Name</label>
                                                    <Input defaultValue={user?.name?.split(' ')[0]} className="bg-gray-50 border-none h-14 rounded-xl font-bold px-6" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Last Name</label>
                                                    <Input defaultValue={user?.name?.split(' ')[1]} className="bg-gray-50 border-none h-14 rounded-xl font-bold px-6" />
                                                </div>
                                                <div className="md:col-span-2 flex flex-col gap-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Street Address</label>
                                                    <Input placeholder="123 Fashion Ave" className="bg-gray-50 border-none h-14 rounded-xl font-bold px-6" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">City</label>
                                                    <Input className="bg-gray-50 border-none h-14 rounded-xl font-bold px-6" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Postal Code</label>
                                                    <Input className="bg-gray-50 border-none h-14 rounded-xl font-bold px-6" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                                <Truck className="w-6 h-6" /> Delivery Method
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setDeliveryMethod('standard')}
                                                    className={`p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all border-2 ${deliveryMethod === 'standard' ? 'border-black bg-black/5 shadow-lg' : 'border-gray-100 hover:border-gray-200 opacity-60'}`}
                                                >
                                                    <div>
                                                        <p className="font-black uppercase tracking-tight">Standard Delivery</p>
                                                        <p className="text-xs text-gray-400 font-bold">3-5 Business Days</p>
                                                    </div>
                                                    <span className="font-black uppercase">$15</span>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setDeliveryMethod('express')}
                                                    className={`p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all border-2 ${deliveryMethod === 'express' ? 'border-black bg-black/5 shadow-lg' : 'border-gray-100 hover:border-gray-200 opacity-60'}`}
                                                >
                                                    <div>
                                                        <p className="font-black uppercase tracking-tight">Express Delivery</p>
                                                        <p className="text-xs text-gray-400 font-bold">1-2 Business Days</p>
                                                    </div>
                                                    <span className="font-black uppercase">$25</span>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <Button onClick={() => setStep(2)} className="w-full md:w-fit bg-black text-white rounded-full px-12 py-8 font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-black/10">
                                            Continue to Payment
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex flex-col gap-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                                <CreditCard className="w-6 h-6" /> Payment Method
                                            </h2>
                                            <div className="flex flex-col gap-4">
                                                <div className="border border-gray-100 p-6 rounded-2xl flex flex-col gap-6 bg-gray-50/50">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                                                                <div className="flex gap-1">
                                                                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                                                                    <div className="w-3 h-3 rounded-full bg-yellow-500 -ml-2 opacity-80" />
                                                                </div>
                                                            </div>
                                                            <span className="font-black uppercase tracking-tight text-sm">Credit / Debit Card</span>
                                                        </div>
                                                        <div className="w-5 h-5 rounded-full border-4 border-black border-double" />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col gap-2">
                                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Number</label>
                                                            <Input placeholder="0000 0000 0000 0000" className="bg-white border-none h-14 rounded-xl font-bold px-6 shadow-sm" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="flex flex-col gap-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Expiry Date</label>
                                                                <Input placeholder="MM / YY" className="bg-white border-none h-14 rounded-xl font-bold px-6 shadow-sm" />
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CVV</label>
                                                                <Input placeholder="123" className="bg-white border-none h-14 rounded-xl font-bold px-6 shadow-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-100 p-6 rounded-2xl flex items-center justify-between opacity-50">
                                                    <span className="font-black uppercase tracking-tight text-sm">PayPal</span>
                                                    <div className="w-5 h-5 rounded-full border border-gray-200" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <Button variant="outline" onClick={() => setStep(1)} className="flex items-center gap-2 rounded-full px-10 py-8 font-black uppercase tracking-widest text-xs border-black">
                                                <ArrowLeft className="w-4 h-4" /> Back
                                            </Button>
                                            <Button onClick={handlePlaceOrder} className="flex-1 bg-black text-white rounded-full px-12 py-8 font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-black/10">
                                                Place Order ${total.toFixed(0)}
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure SSL Connection
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Side - Summary */}
                        <div className="w-full lg:w-[450px]">
                            <div className="border border-black/5 rounded-[32px] p-6 md:p-10 flex flex-col gap-8 shadow-sm bg-white sticky top-32">
                                <h2 className="text-2xl font-black text-black uppercase tracking-tight leading-none">Order Summary</h2>

                                <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
                                    {cartItems.map((item) => (
                                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                                            <div className="w-20 h-20 bg-[#F0EEED] rounded-xl overflow-hidden shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                                <h4 className="font-black text-black uppercase tracking-tight truncate">{item.name}</h4>
                                                <p className="text-xs text-black font-bold mt-1">
                                                    {item.quantity} x <span className="text-gray-400">${item.price}</span>
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                                    Size: {item.selectedSize}
                                                </p>
                                            </div>
                                            <div className="font-black text-black">${item.price * item.quantity}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-4 border-t border-gray-100 pt-8">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-widest">Subtotal</span>
                                        <span className="text-black font-black">${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-widest">Discount (-20%)</span>
                                        <span className="text-red-500 font-black">-${discount.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-widest">Delivery Fee</span>
                                        <span className="text-black font-black">${deliveryFee}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                        <span className="text-black font-black text-2xl uppercase tracking-tighter">Total</span>
                                        <span className="text-black font-black text-3xl tracking-tighter">${total.toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default CheckoutPage;
