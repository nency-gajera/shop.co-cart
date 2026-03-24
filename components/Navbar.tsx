"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, CircleUserRound, ChevronDown, Menu, X, LogOut, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

const Navbar = () => {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hasTyped, setHasTyped] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 700);
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
    const signupUrl = `/signup?callbackUrl=${encodeURIComponent(pathname)}`;

    // Automatic redirect for search logic
    React.useEffect(() => {
        if (hasTyped) {
            const query = debouncedSearch.trim();
            router.push(query ? `/search?q=${encodeURIComponent(query)}` : `/search`);
        }
    }, [debouncedSearch, router, hasTyped]);

    const shopCategories = [
        { name: 'Men', href: '/category/men' },
        { name: 'Women', href: '/category/women' },
        { name: 'Kids', href: '/category/kids' },
    ];

    const navLinks = [
        { name: 'On Sale', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Brands', href: '#' },
    ];

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-b border-gray-100 py-3 md:py-5 px-4 md:px-16 flex items-center justify-between sticky top-0 z-50 shadow-sm"
            >
                <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase leading-none">
                        SHOP.CO
                    </Link>

                    {/* Desktop Main Links */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8 font-bold text-black text-sm lg:text-base">
                        <div className="relative group">
                            <button
                                onMouseEnter={() => setIsShopOpen(true)}
                                onMouseLeave={() => setIsShopOpen(false)}
                                className="flex items-center gap-1 hover:text-gray-600 transition-colors py-2 uppercase tracking-tight"
                            >
                                Shop <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isShopOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isShopOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        onMouseEnter={() => setIsShopOpen(true)}
                                        onMouseLeave={() => setIsShopOpen(false)}
                                        className="absolute top-full left-0 w-48 bg-white shadow-2xl rounded-2xl border border-gray-100 py-4 z-50 overflow-hidden"
                                    >
                                        {shopCategories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={cat.href}
                                                className="block px-6 py-3 hover:bg-gray-50 transition-colors text-black font-bold uppercase text-sm tracking-tight"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="hover:text-gray-600 transition-colors uppercase tracking-tight">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-sm mx-4 lg:mx-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (!hasTyped) setHasTyped(true);
                        }}
                        onKeyDown={handleSearch}
                        placeholder="Search for products..."
                        className="w-full bg-[#F0F0F0] placeholder:text-gray-400 border-none rounded-full py-6 pl-12 pr-4 focus-visible:ring-1 focus-visible:ring-black outline-none transition-all h-12 font-medium"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3 md:gap-5 text-black">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Search className="w-6 h-6" />
                    </button>

                    <Link href="/cart" className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </motion.div>
                    </Link>

                    {user ? (
                        <div className="relative">
                            <motion.button
                                onMouseEnter={() => setIsProfileOpen(true)}
                                onMouseLeave={() => setIsProfileOpen(false)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <CircleUserRound className="w-6 h-6" />
                                <span className="hidden lg:inline text-xs font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                            </motion.button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        onMouseEnter={() => setIsProfileOpen(true)}
                                        onMouseLeave={() => setIsProfileOpen(false)}
                                        className="absolute top-full right-0 w-64 bg-white shadow-2xl rounded-[24px] border border-gray-100 py-4 px-2 z-50 flex flex-col gap-1 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                            <p className="text-sm font-black text-black truncate">{user.email}</p>
                                        </div>
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-black group text-gray-500 hover:text-black uppercase text-xs tracking-wider">
                                            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all font-black group text-red-500 uppercase text-xs tracking-wider"
                                        >
                                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href={loginUrl}>
                            <Button variant="outline" className="rounded-full px-5 py-5 font-black uppercase text-[10px] tracking-widest border-2 border-black hover:bg-black hover:text-white transition-all h-9">
                                Log In
                            </Button>
                        </Link>
                    )}
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl overflow-y-auto px-6 py-10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-black tracking-tighter">SHOP.CO</Link>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8">
                                {/* Mobile Search */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            if (!hasTyped) setHasTyped(true);
                                        }}
                                        onKeyDown={handleSearch}
                                        placeholder="Search products..."
                                        className="w-full bg-[#F0F0F0] border-none rounded-full py-6 pl-12 h-12"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Category</h3>
                                    {shopCategories.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            href={cat.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-xl font-black text-black uppercase tracking-tight hover:translate-x-2 transition-transform inline-flex items-center gap-3"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="h-[1px] bg-gray-100" />

                                <div className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-xl font-black text-black uppercase tracking-tight hover:translate-x-2 transition-transform"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                {user ? (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-black uppercase tracking-tight">{user.name}</p>
                                                <p className="text-xs text-gray-400 font-bold">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 py-4 text-gray-600 font-black uppercase text-sm tracking-widest"
                                        >
                                            <User className="w-5 h-5" />
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                            className="flex items-center gap-3 py-4 text-red-500 font-black uppercase text-sm tracking-widest"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                                        <Link
                                            href={loginUrl}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Button className="w-full bg-black text-white rounded-full py-7 font-black uppercase h-14">
                                                Log In
                                            </Button>
                                        </Link>
                                        <Link
                                            href={signupUrl}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Button variant="outline" className="w-full border-2 border-black rounded-full py-7 font-black uppercase h-14">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
