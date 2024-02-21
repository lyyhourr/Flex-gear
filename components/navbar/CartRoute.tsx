"use client"
import { useCartProducts } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CartRoute() {
    const { cartProducts } = useCartProducts()
    const [cartLength, setCartLength] = useState(0)
    useEffect(() => {
        setCartLength(cartProducts ? cartProducts.length : 0)
    }, [cartProducts])

    return (
        <Link href={"/cart"} className='relative'>
            <ShoppingCart className='w-7 h-7 hover:fill-red-500 transition-all' />
            {cartLength > 0 && (
                <span className='absolute text-xs px-[6px] bg-red-500 text-white rounded-full -top-1 -right-[5px]'>{cartLength}</span>
            )}
        </Link>
    )
}
