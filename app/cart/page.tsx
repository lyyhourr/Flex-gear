"use client"
import NoProduct from '@/components/NoProduct'
import { useAuth } from '@/context/AuthContext'
import { useCartProducts } from '@/context/CartContext'
import { cn } from '@/lib/utils'
import { ICartProducts } from '@/types/types'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CartPage() {
    const { cartProducts, setCartProducts } = useCartProducts()
    const [cartData, setCartData] = useState<ICartProducts[] | null>(null)
    const [coupon, setCoupon] = useState("")
    const [isCouponUsed, setIsCouponUsed] = useState(false)
    const { isLogged } = useAuth()
    const [isUserLogged, setIsUserLogged] = useState<string | null>(null)
    const router = useRouter()
    const couponCode = "lyhour_m"
    useEffect(() => {
        setIsUserLogged(`${isLogged}`)
    }, [isLogged])
    useEffect(() => {
        if (cartProducts) {
            setCartData(cartProducts)
        }
    }, [cartProducts])
    const handleDeleteProductFromCart = (productName: string) => {
        if (cartProducts) {
            const removeProducts = cartProducts.filter(product => product.name !== productName)
            setCartProducts(removeProducts)
        }
    }
    const handleUpdateQty = (productName: string, addQty: boolean) => {
        if (cartProducts) {
            const updateQty = cartProducts.map(item => item.name === productName ? { ...item, qty: addQty ? item.qty + 1 : item.qty - 1 } : item);
            const remove0QtyProducts = updateQty.filter(product => product.qty > 0)
            setCartProducts(remove0QtyProducts)
        }
    }
    const subTotal = Math.floor(cartProducts ? cartProducts.map(item => item.isDiscount ? item.priceAfterDiscount * item.qty : item.price * item.qty).reduce((a, b) => a + b, 0) : 0)
    const finalTotal = subTotal * 50 / 100
    const handleCoupon = (e: any) => {
        e.preventDefault()
        if (coupon === couponCode) {
            setIsCouponUsed(true)
            setCoupon("")
        }
    }
    const handleCheckOut = () => {
        if (isUserLogged === "true") {
            router.push(`/checkout/${isCouponUsed ? `${finalTotal}-c` : `${subTotal}-noc`}`)
        } else {
            router.push("/sign-in")
        }

    }

    return (
        <main className='lg:w-[90%] lg:mx-auto py-5  md:py-16'>
            <section className='pl-4 sm:pl-0 flex gap-5 items-center'>
                <Link href={"/"} className="text-gray-400">Home</Link>
                <span>/</span>
                <Link href={"/cart"} className='underline'>Cart</Link>
            </section>
            {
                cartData && cartData.length > 0 ? (
                    <section className='flex flex-col gap-5 py-10 px-2'>
                        <div className='grid grid-cols-4 gap-y-5 gap-x-3 '>
                            <div className=' flex justify-center'>Products</div>
                            <div className=' flex justify-center'>Price</div>
                            <div className=' flex justify-center'>Quantity</div>
                            <div className=' flex justify-center'>Total</div>
                        </div>

                        {
                            cartData.map((product, i) => {
                                var finalPrice = product.isDiscount ? product.priceAfterDiscount : product.price
                                return (
                                    <div className='grid grid-cols-4 gap-y-5 gap-x-3 border py-3  sm:py-2' key={i}>
                                        <div className=' flex justify-start gap-2 items-center'>
                                            <Image
                                                src={`/categories${product.image}`}
                                                width={100}
                                                height={50}
                                                alt={product.name}
                                                className='w-[40px] sm:w-[60px] lg:w-[110px]'
                                            />
                                            <p className='text-[10px] sm:text-base line-clamp-1'>{product.name}</p>
                                        </div>
                                        <div className=' flex justify-center items-center gap-1 sm:gap-4 text-[10px] sm:text-base'>
                                            {
                                                product.isDiscount ? (
                                                    <>
                                                        <p className='text-red-500 '>${product.priceAfterDiscount}</p>
                                                        <p className='text-gray-500 line-through text-[7px] sm:text-base'>${product.price}</p>
                                                    </>
                                                ) : (

                                                    <p className='text-red-500'>$ {product.price}</p>
                                                )
                                            }
                                        </div>
                                        <div className=' flex justify-center items-center gap-2 sm:gap-4'>
                                            <button className='p-1 border border-gray-200 rounded-md' onClick={() => handleUpdateQty(product.name, false)}><Minus className='w-3 h-3 sm:w-5 sm:h-5' /></button>
                                            <p>{product.qty}</p>
                                            <button className='p-1 border border-gray-200 rounded-md' onClick={() => handleUpdateQty(product.name, true)}><Plus className='w-3 h-3 sm:w-5 sm:h-5' /></button>
                                        </div>
                                        <div className=' flex justify-center items-center gap-2 sm:gap-0'>
                                            <p className='sm:w-full text-center text-xs sm:text-base'> $ {finalPrice * product.qty} </p>
                                            <div className="sm:w-1/4 sm:ml-auto">
                                                <button onClick={() => handleDeleteProductFromCart(product.name)}><Trash2 className='text-red-500 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6' /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <section className='flex md:justify-between md:flex-row items-start flex-col gap-4 md:gap-0'>
                            <div className="flex flex-col gap-1 w-full lg:w-fit">
                                <form className='flex items-center  gap-1 md:gap-3 flex-col lg:flex-row w-full md:w-fit' onSubmit={handleCoupon}>
                                    <input type="text" className='border-gray-700 border p-4 rounded-sm w-full md:w-fit' value={coupon} placeholder='Coupon Code' onChange={(e) => setCoupon(e.target.value)} />
                                    <button className={cn(`px-6 bg-red-500 text-white py-4 w-full md:w-full   rounded-sm hover:bg-red-600`, isCouponUsed && "bg-red-700 cursor-not-allowed")}
                                        disabled={isCouponUsed}>Apply Coupon</button>
                                </form>
                                {!isCouponUsed ? <p className='text-sm text-gray-400'>Coupon Code: {couponCode}</p> : <p className='text-red-500'>YOU GOT 50% OFF</p>}

                            </div>
                            <div className='flex flex-col gap-3 px-10 py-5 border-gray-700 border rounded-sm w-full md:w-fit'>
                                <h1>Cart Total</h1>
                                <div className='flex justify-between py-3 border-b border-black'>
                                    <p>SubTotal </p>
                                    <p>$ {subTotal}</p>
                                </div>
                                <div className='flex justify-between py-3 border-b border-black'>
                                    <p>Shipping </p>
                                    <p>Free</p>
                                </div>
                                <div className='flex justify-between py-3 '>
                                    <p>Total </p>
                                    {
                                        isCouponUsed ? (
                                            <div className='flex items-center '>
                                                <p>${finalTotal}</p>
                                                <p className='line-through text-sm text-gray-400'>${subTotal}</p>
                                            </div>
                                        ) : (
                                            <p>$ {subTotal}</p>
                                        )
                                    }
                                </div>
                                <div className='w-full flex justify-center'>
                                    <button className='bg-red-500 text-white px-8 py-3 hover:bg-red-600 rounded-sm' onClick={handleCheckOut}>
                                        Proccess to checkout
                                    </button>
                                </div>
                            </div>
                        </section>

                    </section>
                ) : <NoProduct title='Cart' />
            }

        </main>
    )
}
