"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, X, Check, ArrowLeft, ArrowRight, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';

const SearchResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    const debouncedSearchQuery = useDebounce(query, 500);

    const colors = [
        '#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5',
        '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'
    ];

    const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
    const productTypes = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans', 'Dresses'];
    const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

    // Core Filtering Logic
    const filteredProducts = products.filter(p => {
        const matchesSearch = !debouncedSearchQuery ||
            p.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            p.type?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            p.style?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

        const matchesType = !selectedType || p.type?.toLowerCase() === selectedType.toLowerCase();
        const matchesStyle = !selectedStyle || p.style?.toLowerCase() === selectedStyle.toLowerCase();
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesColor = !selectedColor || p.color === selectedColor; // Assuming product.color check if exists
        const matchesSize = !selectedSize || p.size === selectedSize; // Assuming product.size check if exists

        return matchesSearch && matchesType && matchesStyle && matchesPrice;
    });

    useEffect(() => {
        const updatePageSize = () => {
            setProductsPerPage(window.innerWidth < 1024 ? 6 : 9);
        };
        updatePageSize();
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const resetFilters = () => {
        setPriceRange([0, 500]);
        setSelectedColor('');
        setSelectedSize('');
        setSelectedType('');
        setSelectedStyle('');
        setCurrentPage(1);
    };

    const FilterContent = ({ isMobile = false }) => (
        <div className="flex flex-col gap-6">
            {!isMobile && (
                <div className="flex items-center justify-between mb-2 pb-6 border-b border-gray-100">
                    <h2 className="text-xl font-black text-black uppercase tracking-tight">Filters</h2>
                    <button onClick={resetFilters} className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors underline underline-offset-4">Reset</button>
                </div>
            )}

            {/* Product Types */}
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-black uppercase text-xs tracking-widest mb-2">Category</h3>
                {productTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => {
                            setSelectedType(selectedType === type ? '' : type);
                            setCurrentPage(1);
                            if (isMobile) setIsFilterOpen(false);
                        }}
                        className={`flex items-center justify-between text-sm transition-all ${selectedType === type ? 'text-black font-bold' : 'text-gray-400 hover:text-black font-medium'}`}
                    >
                        {type} <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                ))}
            </div>

            {/* Price Filter */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-lg text-black mb-5">Price Range</h3>
                <div className="px-2 flex flex-col gap-6">
                    <div className="relative w-full h-8 flex items-center group">
                        {/* Custom Slider Track */}
                        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />

                        {/* Active Range Track Segment */}
                        <div
                            className="absolute h-1.5 bg-black rounded-full"
                            style={{
                                left: `${(priceRange[0] / 500) * 100}%`,
                                width: `${((priceRange[1] - priceRange[0]) / 500) * 100}%`
                            }}
                        />

                        {/* Min Range Input */}
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="50"
                            value={priceRange[0]}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setPriceRange([Math.min(val, priceRange[1] - 50), priceRange[1]]);
                                setCurrentPage(1);
                            }}
                            className="absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-auto z-20"
                        />

                        {/* Max Range Input */}
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="50"
                            value={priceRange[1]}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setPriceRange([priceRange[0], Math.max(val, priceRange[0] + 50)]);
                                setCurrentPage(1);
                            }}
                            className="absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-auto z-20"
                        />

                        {/* Visible Handles */}
                        <div
                            className="absolute w-5 h-5 bg-black border-2 border-white rounded-full shadow-md pointer-events-none transition-all scale-100 group-hover:scale-110 z-10"
                            style={{ left: `calc(${(priceRange[0] / 500) * 100}% - 10px)` }}
                        />
                        <div
                            className="absolute w-5 h-5 bg-black border-2 border-white rounded-full shadow-md pointer-events-none transition-all scale-100 group-hover:scale-110 z-10"
                            style={{ left: `calc(${(priceRange[1] / 500) * 100}% - 10px)` }}
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Min</span>
                            <span className="font-black text-sm">${priceRange[0]}</span>
                        </div>
                        <div className="w-4 h-[1.5px] bg-gray-300" />
                        <div className="flex flex-col text-right">
                            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Max</span>
                            <span className="font-black text-sm">${priceRange[1]}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dress Style */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-lg text-black mb-5">Dress Style</h3>
                <div className="flex flex-col gap-3">
                    {dressStyles.map(style => (
                        <button
                            key={style}
                            onClick={() => {
                                setSelectedStyle(selectedStyle === style ? '' : style);
                                setCurrentPage(1);
                                if (isMobile) setIsFilterOpen(false);
                            }}
                            className={`flex items-center justify-between text-sm transition-all ${selectedStyle === style ? 'text-black font-bold' : 'text-gray-400 hover:text-black font-medium'}`}
                        >
                            {style} <ChevronRight className="w-4 h-4 opacity-50" />
                        </button>
                    ))}
                </div>
            </div>

            {isMobile && (
                <div className="flex gap-4 mt-4">
                    <Button onClick={resetFilters} variant="outline" className="flex-1 rounded-full py-6 font-bold uppercase border-black/10">Reset All</Button>
                    <Button onClick={() => setIsFilterOpen(false)} className="flex-2 bg-black text-white rounded-full py-6 font-bold hover:bg-black/90 transition-all uppercase tracking-tight h-14">
                        Apply
                    </Button>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 md:px-16 pt-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-black font-medium">Search Results</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-[295px] shrink-0 border border-black/10 rounded-[20px] p-6 h-fit hidden lg:block">
                        <FilterContent />
                    </aside>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl md:text-[32px] font-black text-black uppercase tracking-tight">
                                    {query ? `Results for "${query}"` : "All Products"}
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Showing {currentProducts.length} of {filteredProducts.length} items</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={resetFilters}
                                    className="lg:hidden text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="lg:hidden flex items-center justify-center gap-2 bg-[#F0F0F0] py-3 px-6 rounded-full font-bold text-sm tracking-tight"
                                >
                                    <SlidersHorizontal className="w-4 h-4" /> Filters
                                </button>
                            </div>
                        </div>

                        {currentProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-8">
                                {currentProducts.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <SearchIcon className="w-10 h-10 text-gray-300" />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">No results found</h2>
                                <p className="text-gray-500 max-w-sm">We couldn't find anything matching your search. Try different keywords or check out our latest arrivals.</p>
                                <Link href="/" className="mt-8 bg-black text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-black/90 transition-all">
                                    Return Home
                                </Link>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between font-medium">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-xl disabled:opacity-30 text-black text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Previous
                                </button>
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === page ? 'bg-black text-white' : 'text-black/40 hover:text-black bg-black/5'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-xl disabled:opacity-30 text-black text-sm"
                                >
                                    Next <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-black/40 z-90 lg:hidden backdrop-blur-sm" />
                        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 bg-white z-100 lg:hidden rounded-t-[32px] max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black uppercase text-black">Filters</h2>
                                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
                            </div>
                            <FilterContent isMobile={true} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center font-black uppercase tracking-tighter">Searching...</div>}>
            <SearchResults />
        </Suspense>
    );
}
