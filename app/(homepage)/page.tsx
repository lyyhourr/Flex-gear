import HeroSlide from "@/components/hero-slide/Hero-Slide";
import Category from "@/components/homepage/Category";
import ProductsLayout from "@/components/products-layout/Products-Layout";
import { productsData } from "@/data/products";


export default function Home() {
  return (
    <div className="py-1">
      <HeroSlide />
      <main className="p-3  container flex flex-col gap-20">
        <ProductsLayout
          header="today's"
          category="FlashSale"
          subHeader="Flash Sale"
          showViewCollection
          productsData={productsData.filter(item => item.category === "FlashSale").slice(0, 4)}
        />
        <Category />
        <ProductsLayout
          header="This Month"
          category="BestSelling"
          subHeader="Best Selling"
          showViewCollection
          productsData={productsData.filter(item => item.category === "BestSelling").slice(0, 4)}
        />
        <ProductsLayout
          header="Our Product"
          category="ourproducts"
          subHeader="Explore"
          showViewCollection
          productsData={productsData.filter(item => item.category === "ourproducts").slice(0, 8)}
        />
      </main>
    </div>
  );
}
