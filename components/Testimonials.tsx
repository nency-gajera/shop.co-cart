"use client";

import React from 'react';
import { Star, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
    {
        name: 'Sarah M.',
        text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."',
        verified: true
    },
    {
        name: 'Alex K.',
        text: '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
        verified: true
    },
    {
        name: 'James L.',
        text: '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."',
        verified: true
    },
    {
        name: 'Monica R.',
        text: '"The customer service at Shop.co is world-class. I had an issue with sizing and they resolved it in minutes. Plus, the clothes are absolutely stunning and fit perfectly!"',
        verified: true
    },
    {
        name: 'David S.',
        text: '"I\'ve been shopping here for months and I\'m never disappointed. The delivery is always on time, and the quality of the fabric is much better than other brands in this price range."',
        verified: true
    },
    {
        name: 'Emily B.',
        text: '"Shop.co has completely changed how I think about online fashion. The website is intuitive, and the style guides helped me build a whole new wardrobe from scratch. Highly recommend!"',
        verified: true
    },
    {
        name: 'Christopher G.',
        text: '"Being a tall guy, finding the right fit is tough. Shop.co has incredible sizing options that actually work. The quality of the denim and t-shirts is top-tier. My go-to from now on."',
        verified: true
    },
    {
        name: 'Olivia W.',
        text: '"Absolutely love the sustainable approach Shop.co is taking. It\'s great to find stylish pieces that are also ethically made. The colors stay vibrant even after many washes. Five stars!"',
        verified: true
    }
];

const Testimonials = () => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-12 md:py-24 overflow-hidden bg-white">
            <div className="container mx-auto px-4 md:px-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[32px] md:text-5xl font-black uppercase tracking-tighter text-black leading-[0.9] max-w-sm"
                    >
                        OUR HAPPY CUSTOMERS
                    </motion.h2>
                    <div className="flex gap-3 md:gap-4 self-end md:self-auto mb-2 md:mb-0">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scroll('left')}
                            className="p-3 md:p-4 border border-gray-100 rounded-full hover:bg-black transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scroll('right')}
                            className="p-3 md:p-4 border border-gray-100 rounded-full hover:bg-black transition-all group"
                        >
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    ref={scrollRef}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                >
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className="min-w-[310px] md:min-w-[400px] border border-black/10 rounded-[20px] p-8 md:p-10 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-500 snap-center"
                        >
                            <div className="flex text-[#FFC633] gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-[#FFC633] stroke-none" />
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">{review.name}</span>
                                {review.verified && (
                                    <div className="bg-[#01AB31] rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-white stroke-[4]" />
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-500 leading-relaxed text-base font-medium opacity-80">
                                {review.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Custom CSS for hidden scrollbar */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
