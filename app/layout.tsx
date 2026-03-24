import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import { Newsletter, Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHOP.CO - Your Premium Fashion Destination",
  description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white`}>
        <AuthProvider>
          <CartProvider>
            <TopBanner />
            <Navbar />
            <main>
              {children}
            </main>
            <Newsletter />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
