import ProductsCard from '@/components/products-layout/Products-Card'
import { productsData } from '@/data/products'
import { inter } from '@/fonts/font'
import React from 'react'

export default function ProductsByCategory({ params }: { params: { cate: string } }) {
    const productsByCategory = productsData.filter(product => product.productType.includes(params.cate))
    return (
        <main className={`container ${inter.className} flex flex-col gap-5 pb-40`}>
            <section className="flex items-center gap-2 py-8">
                <div className="h-7 w-3 rounded-sm bg-red-500" />
                <p className="text-lg text-red-500 first-letter:uppercase">{params.cate}  </p>
            </section>
            <section className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4  gap-3 gap-y-5 xl:gap-14">
                {
                    productsByCategory.map((item, i) => (
                        <ProductsCard key={i} cardData={item} />
                    ))
                }

            </section>
        </main>
    )
}
