import { categories } from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Category() {
    return (
        <div className="flex flex-col gap-3">
            <section className="flex items-center gap-2">
                <div className="h-7 w-3 rounded-sm bg-red-500" />
                <p className="text-sm text-red-500 ">Category</p>
            </section>
            <section>
                <p className="text-3xl">Browse By Category</p>
            </section>
            <section className="grid grid-cols-3 gap-3 sm:grid-cols-4  md:grid-cols-5   lg:grid-cols-6 xl:gap-20">
                {
                    categories.map((item, i) => (
                        <Link href={`/category/${item}`} className="flex items-center justify-center flex-col gap-2  py-5 xl:py-8 border border-gray-300 rounded-md" key={i}>
                            <Image
                                src={`/categories/icons/${item}.png`}
                                width={40}
                                height={40}
                                alt={item}
                                className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]'
                                unoptimized
                            />
                            <p className="first-letter:uppercase text-sm sm:text-base">{item}</p>
                        </Link>
                    ))
                }
            </section>
        </div>
    )
}
