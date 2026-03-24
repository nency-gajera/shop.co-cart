"use client";

import React, { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
    const params = useParams();
    const slug = params.slug as string;
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    // Dynamic Filtering Logic
    const filteredProducts = products.filter(p => {
        // Base category match
        const isBaseCategory = p.style?.toLowerCase() === slug.toLowerCase() || p.gender?.toLowerCase() === slug.toLowerCase();

        // Additional filters
        const matchesType = !selectedType || p.type?.toLowerCase() === selectedType.toLowerCase();
        const matchesStyle = !selectedStyle || p.style?.toLowerCase() === selectedStyle.toLowerCase();
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

        return isBaseCategory && matchesType && matchesStyle && matchesPrice;
    });

    // Responsive products per page
    React.useEffect(() => {
        const updatePageSize = () => {
            setProductsPerPage(window.innerWidth < 1024 ? 6 : 9);
        };
        updatePageSize();
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    // Pagination calculations
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (page: number | string) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const colors = ['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'];
    const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
    const productTypes = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans', 'Dresses'];

    const resetFilters = () => {
        setPriceRange([0, 500]);
        setSelectedType('');
        setSelectedStyle('');
        setSelectedColor('');
        setSelectedSize('');
        setCurrentPage(1);
    };

    const FilterContent = ({ isMobile = false }) => (
        <div className={`flex flex-col ${isMobile ? 'h-full' : ''}`}>
            {!isMobile && (
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                    <h2 className="text-xl font-black text-black uppercase tracking-tight">Filters</h2>
                    <button onClick={resetFilters} className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors underline underline-offset-4 decoration-1">Reset</button>
                </div>
            )}

            <div className="flex flex-col gap-4 mb-6">
                {productTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => {
                            setSelectedType(selectedType === type ? '' : type);
                            setCurrentPage(1);
                            if (isMobile) setIsFilterOpen(false);
                        }}
                        className={`flex items-center justify-between transition-colors font-medium ${selectedType === type ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}`}
                    >
                        {type} <ChevronRight className="w-4 h-4" />
                    </button>
                ))}
            </div>

            <div className="mb-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-black">Price Range</h3>
                    <ChevronUp className="w-5 h-5" />
                </div>
                <div className="px-2 flex flex-col gap-6">
                    <div className="relative w-full h-8 flex items-center group">
                        {/* Custom Slider Track */}
                        <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />

                        {/* Active Range Track Segment */}
                        <div
                            className="absolute h-1.5 bg-black rounded-full"
                            style={{
                                left: `${(priceRange[0] / 500) * 100}%`,
                                width: `${((priceRange[1] - priceRange[0]) / 500) * 100}%`
                            }}
                        />

                        {/* Min Range Input (Hidden visual, controls first handle) */}
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

                        {/* Max Range Input (Hidden visual, controls second handle) */}
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

                        {/* Visible Handles (Pure UI) */}
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

            <div className="mb-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-black">Colors</h3>
                    <ChevronUp className="w-5 h-5" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {colors.map(color => (
                        <button
                            key={color}
                            className={`w-9 h-9 rounded-full border border-black/10 flex items-center justify-center transition-all hover:scale-110`}
                            style={{ backgroundColor: color }}
                            onClick={() => { setSelectedColor(selectedColor === color ? '' : color); setCurrentPage(1); }}
                        >
                            {selectedColor === color && (
                                <Check className={`w-4 h-4 ${color === '#FFFFFF' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-black">Size</h3>
                    <ChevronUp className="w-5 h-5" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                        <button
                            key={size}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}
                            onClick={() => { setSelectedSize(selectedSize === size ? '' : size); setCurrentPage(1); }}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-lg text-black">Dress Style</h3>
                    <ChevronUp className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4">
                    {['Casual', 'Formal', 'Party', 'Gym'].map(style => (
                        <button
                            key={style}
                            onClick={() => { setSelectedStyle(selectedStyle === style ? '' : style); setCurrentPage(1); if (isMobile) setIsFilterOpen(false); }}
                            className={`flex items-center justify-between transition-colors font-medium ${selectedStyle === style ? 'text-black font-bold' : 'text-gray-400 hover:text-black'}`}
                        >
                            {style} <ChevronRight className="w-4 h-4" />
                        </button>
                    ))}
                </div>
            </div>

            {isMobile ? (
                <div className="flex gap-4 mt-auto">
                    <Button onClick={resetFilters} variant="outline" className="flex-1 rounded-full py-7 font-bold uppercase border-black/10 h-14">Reset All</Button>
                    <Button onClick={() => setIsFilterOpen(false)} className="flex-2 bg-black text-white rounded-full py-7 font-bold hover:bg-black/90 transition-all uppercase tracking-tight h-14">
                        Apply Filter
                    </Button>
                </div>
            ) : (
                <Button onClick={() => setIsFilterOpen(false)} className="w-full bg-black text-white rounded-full py-7 font-bold hover:bg-black/90 transition-all uppercase tracking-tight h-14 mt-auto">
                    Apply Filter
                </Button>
            )}
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-16 pt-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 md:mb-8 border-t border-gray-100 pt-6 md:border-none md:pt-0">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-black capitalize font-medium">{slug}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="w-full lg:w-[295px] shrink-0 border border-black/10 rounded-[20px] p-6 h-fit hidden lg:block">
                        <FilterContent />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h1 className="text-2xl md:text-[32px] font-black text-black capitalize tracking-tight">{slug}</h1>
                            <div className="flex items-center gap-3 md:gap-4 text-sm text-gray-500">
                                <span className="hidden sm:inline">
                                    Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} Products
                                </span>
                                <div className="hidden md:flex items-center gap-1 text-black font-bold cursor-pointer">
                                    Sort by: <span className="text-gray-400 font-medium">Most Popular</span> <ChevronDown className="w-4 h-4" />
                                </div>
                                <div className="flex lg:hidden items-center gap-2">
                                    <button
                                        onClick={resetFilters}
                                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => setIsFilterOpen(true)}
                                        className="w-8 h-8 rounded-full bg-[#F0F0F0] flex items-center justify-center text-black"
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-h-[400px]">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((p, idx) => (
                                    <motion.div
                                        key={`${p.id}-${idx}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <ProductCard product={p} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-gray-400 font-medium">No products found fitting your criteria.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination - Dynamic based on state */}
                        {totalPages > 1 && (
                            <div className="mt-12 pt-5 border-t border-gray-100 flex items-center justify-between font-medium">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-black text-xs md:text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Previous
                                </button>

                                <div className="flex items-center gap-1 md:gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-sm transition-all ${currentPage === page ? 'bg-black text-white' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-black text-xs md:text-sm"
                                >
                                    Next <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay - Optimized z-index */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/40 z-90 lg:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white z-100 lg:hidden rounded-t-[20px] max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-black uppercase tracking-tight">Filters</h2>
                                    <button onClick={() => setIsFilterOpen(false)} className="text-gray-400">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <FilterContent isMobile={true} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryPage;
