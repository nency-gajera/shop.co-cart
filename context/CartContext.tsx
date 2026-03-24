"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { useAuth } from './AuthContext';

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Key for user specific cart in localStorage
    const getCartKey = () => (user ? `cart_${user.id}` : 'guest_cart');

    // Effect to handle cart load when user log in or log out
    useEffect(() => {
        const cartKey = getCartKey();
        const savedCart = localStorage.getItem(cartKey);

        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
                setCartItems([]);
            }
        } else {
            setCartItems([]);
        }
    }, [user?.id]); // Also re-run when user changes

    // Update localStorage whenever cartItems or user changes
    useEffect(() => {
        const cartKey = getCartKey();
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }, [cartItems, user?.id]);

    const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
        if (!user) {
            // Option 1: Show alert, Option 2: handled in UI
            return;
        }

        setCartItems(prev => {
            const existing = prev.find(item =>
                item.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
            );

            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedSize === size && item.selectedColor === color)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
