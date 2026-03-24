"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Simulate API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const foundUser = users.find((u: any) => u.email === email && u.password === password);

                if (foundUser) {
                    const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
                    setUser(userData);
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    resolve();
                } else {
                    reject(new Error("Invalid email or password"));
                }
            }, 500);
        });
    };

    const signup = async (name: string, email: string, password: string) => {
        // Simulate API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.find((u: any) => u.email === email)) {
                    reject(new Error("User already exists"));
                    return;
                }

                const newUser = { id: Date.now().toString(), name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
                setUser(userData);
                localStorage.setItem('currentUser', JSON.stringify(userData));
                resolve();
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
