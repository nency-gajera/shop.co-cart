import Hero from "@/components/Hero";
import BrandRibbon from "@/components/BrandRibbon";
import ProductSection from "@/components/ProductSection";
import DressStyle from "@/components/DressStyle";
import Testimonials from "@/components/Testimonials";
import { products } from "@/data/products";

export default function Home() {
  const newArrivals = products.filter(p => p.category === 'new').slice(0, 4);
  const topSelling = products.filter(p => p.category === 'top').slice(0, 4);

  return (
    <>
      <Hero />
      <BrandRibbon />
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />
      <ProductSection title="TOP SELLING" products={topSelling} />
      <DressStyle />
      <Testimonials />
    </>
  );
}
