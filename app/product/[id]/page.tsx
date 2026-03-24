"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { products } from '@/data/products';
import { Star, Check, Minus, Plus, ChevronRight, SlidersHorizontal, ChevronDown, StarHalf, PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSection from '@/components/ProductSection';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const ProductDetails = () => {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const id = params.id as string;
    const product = products.find(p => p.id === id) || products[0];

    const { addToCart } = useCart();
    const { user } = useAuth();

    // Map of display colors to their associated hex codes in data
    const colorMap = [
        { name: 'olive', value: '#4F4631' },
        { name: 'navy', value: '#31344F' },
        { name: 'black', value: '#314F4A' }
    ];

    const [selectedColor, setSelectedColor] = useState(product.color || '#31344F');

    // Filter images based on color if grouping exists - Case-insensitive lookup
    const displayImages = (() => {
        if (!product.colorImages) return product.images || [product.image, product.image, product.image];

        const targetColor = selectedColor.toLowerCase();
        const foundKey = Object.keys(product.colorImages).find(k => k.toLowerCase() === targetColor);

        return foundKey ? product.colorImages[foundKey] : (product.images || [product.image, product.image, product.image]);
    })();

    const [selectedImage, setSelectedImage] = useState(displayImages[0]);
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('reviews');

    // Update main image and gallery when color changes
    useEffect(() => {
        const targetColor = selectedColor.toLowerCase();
        if (product.colorImages) {
            const foundKey = Object.keys(product.colorImages).find(k => k.toLowerCase() === targetColor);
            if (foundKey) {
                const newImages = product.colorImages[foundKey];
                setSelectedImage(newImages[0]);
            }
        }
    }, [selectedColor, product.colorImages]);

    const handleAddToCart = () => {
        if (!user) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }
        addToCart(product, quantity, selectedColor, selectedSize);
    };

    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

    const productReviews = product.reviews || [
        {
            id: 1,
            name: 'Samantha D.',
            rating: 5,
            text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
            date: 'August 14, 2023',
            verified: true
        },
        {
            id: 2,
            name: 'Alex M.',
            rating: 5,
            text: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
            date: 'August 15, 2023',
            verified: true
        },
        {
            id: 3,
            name: 'Ethan R.',
            rating: 5,
            text: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
            date: 'August 16, 2023',
            verified: true
        }
    ];

    const productDetails = product.details || [
        "100% Premium Cotton for maximum breathability",
        "Unique graphic design created by professional artists",
        "Durable stitching and tailored fit",
        "Pre-shrunk fabric to maintain size and shape",
        "Machine washable and easy to care for"
    ];

    const globalFAQs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unworn and unwashed items. Simply reach out to our support team to initiate the process."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days depending on your location."
        },
        {
            question: "Do you offer international shipping?",
            Answer: "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by region."
        },
        {
            question: "How should I care for my product?",
            answer: "We recommend washing in cold water with similar colors and air drying or tumble drying on low to preserve the print and fabric quality."
        }
    ];

    const similarProducts = products.filter(p => p.id !== product.id).slice(0, 4);


    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 md:px-16 pt-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link> <ChevronRight className="w-4 h-4" />
                    <Link href="#" className="hover:text-black transition-colors">Shop</Link> <ChevronRight className="w-4 h-4" />
                    <Link href="#" className="hover:text-black transition-colors capitalize">{product.gender || 'Men'}</Link> <ChevronRight className="w-4 h-4" />
                    <span className="text-black font-medium">{product.name}</span>
                </div>

                {/* Product Detail Section */}
                <div className="flex flex-col lg:flex-row gap-10 mb-20">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-1/2">
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                            {displayImages.map((img, i) => (
                                <div
                                    key={`${selectedColor}-${i}`}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-24 h-24 md:w-32 md:h-40 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${selectedImage === img ? 'border-black' : 'border-transparent bg-[#F0EEED]'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 bg-[#F0EEED] rounded-[40px] overflow-hidden aspect-square lg:aspect-auto h-full">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col gap-6">
                        <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2">
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

                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-black">${product.price}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-3xl font-bold text-gray-400 line-through">${product.originalPrice}</span>
                                    <span className="bg-red-100 text-red-500 font-bold px-3 py-1 rounded-full text-sm">
                                        {product.discount}
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-gray-500 leading-relaxed border-b border-gray-100 pb-6">
                            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                        </p>

                        {/* Color Selection */}
                        <div className="border-b border-gray-100 pb-6">
                            <span className="text-gray-500 block mb-4">Select Colors</span>
                            <div className="flex gap-4">
                                {Object.keys(product.colorImages || {}).length > 0 ? (
                                    Object.keys(product.colorImages || {}).map(hex => (
                                        <button
                                            key={hex}
                                            onClick={() => setSelectedColor(hex)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-gray-100"
                                            style={{ backgroundColor: hex }}
                                        >
                                            {selectedColor.toLowerCase() === hex.toLowerCase() && <Check className="w-5 h-5 text-white mix-blend-difference" />}
                                        </button>
                                    ))
                                ) : (
                                    colorMap.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.value)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-gray-100"
                                            style={{ backgroundColor: color.value }}
                                        >
                                            {selectedColor === color.value && <Check className="w-5 h-5 text-white mix-blend-difference" />}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="border-b border-gray-100 pb-6">
                            <span className="text-gray-500 block mb-4">Choose Size</span>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-full font-medium transition-all ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and CTA */}
                        <div className="flex gap-4">
                            <div className="bg-[#F0F0F0] flex items-center rounded-full px-5 py-4 gap-6">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-black transition-colors"><Minus className="w-5 h-5" /></button>
                                <span className="font-bold w-4 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-black transition-colors"><Plus className="w-5 h-5" /></button>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white rounded-full py-8 font-bold text-lg hover:bg-black/90 transition-all active:scale-[0.98]"
                            >
                                {user ? "Add to Cart" : "Log in to Shop"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-10">
                    <div className="flex border-b border-gray-100">
                        {[
                            { id: 'details', label: 'Product Details' },
                            { id: 'reviews', label: 'Rating & Reviews' },
                            { id: 'faqs', label: 'FAQs' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-6 font-medium text-lg border-b-2 transition-all ${activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mb-20">
                    <AnimatePresence mode="wait">
                        {activeTab === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12"
                            >
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Specifications</h3>
                                        <ul className="flex flex-col gap-4">
                                            {productDetails.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                                                    <span className="text-gray-500 font-medium">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
                                        <h4 className="font-black uppercase tracking-widest text-xs text-gray-400 mb-4">Material & Care</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Our products are made with sustainability in mind. Always check the inside label for specific fabric composition and care instructions.
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-[40px] overflow-hidden bg-[#F0EEED] relative group h-[400px]">
                                    <img src={product.image} alt="" className="w-full h-full object-contain" />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'reviews' && (
                            <motion.div
                                key="reviews"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                                        All Reviews <span className="text-gray-400 font-normal text-sm">({productReviews.length})</span>
                                    </h2>
                                    <div className="flex gap-4">
                                        <button className="w-12 h-12 bg-[#F0F0F0] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all">
                                            <SlidersHorizontal className="w-5 h-5 rotate-90" />
                                        </button>
                                        <button className="hidden md:flex items-center gap-2 bg-[#F0F0F0] rounded-full px-6 font-bold">
                                            Latest <ChevronDown className="w-4 h-4" />
                                        </button>
                                        <Button className="bg-black text-white rounded-full px-4 py-6 font-bold">
                                            Write a Review
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {productReviews.map((review, idx) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="border border-gray-100 rounded-[20px] p-8 flex flex-col gap-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex text-[#FFC633]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'fill-[#FFC633]' : 'text-gray-200'}`} />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-xl text-black">{review.name}</h4>
                                                {review.verified && (
                                                    <div className="bg-green-500 rounded-full p-0.5"><Check className="w-3 h-3 text-white" /></div>
                                                )}
                                            </div>

                                            <p className="text-gray-500 leading-relaxed italic">
                                                {review.text}
                                            </p>

                                            <span className="text-gray-400 text-sm font-medium mt-auto">
                                                Posted on {review.date}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-12 text-center">
                                    <button className="px-10 py-4 border border-gray-100 rounded-full font-bold hover:bg-gray-50 transition-all">
                                        Load More Reviews
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'faqs' && (
                            <motion.div
                                key="faqs"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-3xl mx-auto"
                            >
                                <div className="text-center mb-12">
                                    <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                                        <PlusCircle className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Frequently Asked Questions</h2>
                                    <p className="text-gray-500 font-medium">Have a question? We&apos;re here to help you with everything you need to know about our products and services.</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {globalFAQs.map((faq, i) => (
                                        <div key={i} className="border-b border-gray-100 last:border-0 rounded-2xl overflow-hidden bg-gray-50/50">
                                            <details className="group">
                                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-lg text-black hover:bg-gray-100/50 transition-all [&::-webkit-details-marker]:hidden">
                                                    {faq.question}
                                                    <span className="shrink-0 transition-transform duration-300 group-open:rotate-180">
                                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                                    </span>
                                                </summary>
                                                <div className="px-6 pb-6 text-gray-500 font-medium leading-relaxed">
                                                    {faq.answer || faq.Answer}
                                                </div>
                                            </details>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* You Might Also Like */}
                <ProductSection
                    title="YOU MIGHT ALSO LIKE"
                    products={similarProducts}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
