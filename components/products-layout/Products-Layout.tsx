import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductsCard from "./Products-Card";
import { IProduct } from "@/types/types";

interface ProductsLayout {
  header: string;
  subHeader?: string;
  productsData: IProduct[];
  category?: string
  showViewCollection?: boolean
}

export default function ProductsLayout({
  header,
  productsData,
  subHeader,
  category,
  showViewCollection
}: ProductsLayout) {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center gap-2">
        <div className="h-7 w-3 rounded-sm bg-red-500" />
        <p className="text-sm text-red-500 ">{header}</p>
      </section>
      <section className="flex justify-between items-center">
        <p className="text-3xl">{subHeader}</p>
        {
          showViewCollection && (
            <Link
              href={`collections/${category}`}
              className="text-red-500 flex items-center gap-2 group "
            >
              <p className="group-hover:underline">View collection</p>
              <ArrowRight className="group-hover:-mr-1 transition-all" />
            </Link>
          )
        }
      </section>
      <section className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4  gap-3 gap-y-5 xl:gap-14">
        {productsData.map((item, i) => (
          <ProductsCard key={i} cardData={item} />
        ))}
      </section>
    </div>
  );
}
