"use client"
import { useWishListProducts } from '@/context/WishListContext'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function WishListRoute() {
    const { wishListProducts } = useWishListProducts()
    const [wishListLength, setWishListLength] = useState(0)
    useEffect(() => {
        setWishListLength(wishListProducts ? wishListProducts.length : 0)
    }, [wishListProducts])
    return (
        <Link href={"/wish-list"} className='relative'>
            <Heart className='w-7 h-7 hover:fill-red-500 transition-all' />
            {
                wishListLength > 0 && (
                    <span className='absolute text-xs px-[6px] bg-red-500 text-white rounded-full -top-1 -right-[5px]'>{wishListLength}</span>
                )
            }
        </Link>
    )
}
