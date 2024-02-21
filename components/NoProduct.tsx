import { spaceGrotesk } from '@/fonts/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NoProduct({ title }: { title: string }) {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <Image
                src={"/sadface-cart.png"}
                width={550}
                height={550}
                alt='empty-cart image'
            />
            <p className={` ${spaceGrotesk.className} text-gray-500 text-3xl`}>No Products in your {title}</p>

            <Link href={"/"} className='mt-5 py-3 bg-black rounded-sm px-5 text-white hover:bg-slate-900'>Return to Shop</Link>

        </div>
    )
}
