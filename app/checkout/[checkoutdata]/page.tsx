"use client"
import { useCartProducts } from '@/context/CartContext'
import { imbPlexSans } from '@/fonts/font'
import { ICartProducts } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const initialFormValue = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    street: "",
    townOrCity: "",
}

export default function CheckoutPage({ params }: { params: { checkoutdata: string } }) {
    const { checkoutdata } = params
    const split = checkoutdata.split("-")
    const isCouponUsed = split[1] === "c";
    const totalprice = split[0]
    const { cartProducts } = useCartProducts()
    const [cartData, setCartData] = useState<ICartProducts[] | null>(null)
    const [formData, setFormData] = useState(initialFormValue)
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const router = useRouter()
    const formFields = [
        {
            label: "First Name",
            name: "firstname",
            value: formData.firstname
        },
        {
            label: "Last Name",
            name: "lastname",
            value: formData.lastname
        },
        {
            label: "Phone Number",
            name: "phonenumber",
            value: formData.phonenumber
        },
        {
            label: "Street Address",
            name: "street",
            value: formData.street
        },
        {
            label: "Email (optional)",
            name: "email",
            value: formData.email
        },
        {
            label: "Town / City",
            name: "townOrCity",
            value: formData.townOrCity
        },
    ]
    const [masterCard, setMasterCard] = useState("")
    useEffect(() => {
        if (cartProducts?.length) {
            setCartData(cartProducts)
        } else {
            router.back()
        }
    }, [cartProducts])
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const validation = () => {
        const { email, firstname, lastname, phonenumber, street, townOrCity } = formData
        if (firstname.length < 3) {
            toast.error("incorrected firstname")
            return false
        }
        else if (lastname.length < 3) {
            toast.error("incorrected lastname")
            return false
        }
        else if (isNaN(Number(formData.phonenumber))) {
            toast.error(" phonenumber must be numbers")
            return false
        }
        else if (phonenumber.length < 6) {
            toast.error("incorrected phonenumber")
            return false
        }
        else if (street.length < 3) {
            toast.error("incorrected street address")
            return false
        }
        else if (townOrCity.length < 5) {
            toast.error("incorrected town / city")
            return false
        } else if (paymentMethod === "bank") {
            if (masterCard.length !== 12) {
                toast.error("incorrected mastercard")
                return false
            }
            else if (isNaN(Number(masterCard))) {
                toast.error("mastercard must be numbers only")
                return false
            } else {
                return true
            }
        }
        else {
            return true
        }
    }
    const handlePlaceOrder = () => {
        const validate = validation()
        if (validate) {
            router.push("/thanks-you")
            toast.success("order success")
        }

    }


    return (
        <div className='flex flex-col gap-5 container'>
            <header className='flex py-5 lg:py-10 items-center '>
                <Link href={"/"} className='text-gray-500'>Home</Link>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <Link href={"/cart"} className='text-gray-500'>Cart</Link>
                &nbsp;&nbsp;/&nbsp;&nbsp;
                <Link href={`/checkout/${checkoutdata}`} className='text-black'>Checkout</Link>
            </header>
            <h1 className='text-4xl'>Billing Details</h1>
            <main className='flex flex-col lg:flex-row gap-5'>
                <section className='flex flex-col gap-2 lg:gap-5 w-full'>
                    {
                        formFields.map((field, i) => (
                            <div className='flex flex-col' key={i}>
                                <p className='text-sm text-gray-400'>{field.label}*</p>
                                <input type="text" className='px-3 bg-gray-100 w-full lg:w-4/5 py-2' name={field.name} onChange={handleChange} value={field.value} />
                            </div>
                        ))
                    }
                </section>
                <section className='w-full flex flex-col gap-2'>
                    <div className='flex flex-col  lg:h-[250px] lg:overflow-auto '>
                        {
                            cartData?.map((item, i) => (
                                <div className='flex justify-between items-center' key={i}>
                                    <div className='flex items-center'>
                                        <p className='text-gray-400 text-sm '>x {item.qty}</p>
                                        <Image
                                            src={`/categories${item.image}`}
                                            width={80}
                                            height={80}
                                            alt={item.name}
                                        />
                                        <p className='line-clamp-1 text-xs first-letter:uppercase'>{item.name}</p>
                                    </div>
                                    <p className='w-[60px] '>${(item.isDiscount ? item.price : item.priceAfterDiscount) * item.qty}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`flex flex-col gap-4 pt-5 ${imbPlexSans.className}`}>
                        <div className='flex justify-between items-center pb-4 border-b border-gray-300'>
                            <p className={`text-lg `}>Subtotal</p>
                            <p>$ {totalprice}</p>
                        </div>
                        <div className='flex justify-between items-center pb-4 border-b border-gray-300'>
                            <p className={`text-lg `}>Shipping</p>
                            <p className='text-gray-400'>Free</p>
                        </div>
                        <div className='flex justify-between items-center pb-4 border-b border-gray-300'>
                            <p className={`text-lg `}>Total</p>
                            {
                                isCouponUsed ? (
                                    <div className='flex items-center gap-1'>
                                        <p >$ {totalprice}</p>
                                        <p className='line-through text-sm text-gray-500'>$ {Number(totalprice) * 2}</p>
                                    </div>
                                ) : (
                                    <p>$ {totalprice}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-5  items-start'>
                        <div className="flex items-center gap-2 hover:bg-gray-100 w-full" onClick={() => setPaymentMethod("bank")}>
                            <input type="radio" name='payment' checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
                            <p>Bank</p>
                        </div>
                        {
                            paymentMethod === "bank" && (
                                <div className='flex flex-col '>
                                    <p className='text-sm text-gray-400'>Master Card*</p>
                                    <input className='bg-gray-100 p-2 rounded-sm outline-none' value={masterCard} onChange={(e) => setMasterCard(e.target.value)} placeholder='xxx xxx xxx xxx' />
                                </div>
                            )
                        }
                        <div className='flex items-center gap-2 cursor-pointer w-full  hover:bg-gray-100' onClick={() => setPaymentMethod("cash")}>
                            <input type="radio" name='payment' checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
                            <p>Cash On Delivery</p>
                        </div>
                    </div>
                    <button className='py-2 mt-2 mb-7 bg-red-500 text-white rounded-sm' onClick={handlePlaceOrder}>Place Order</button>
                </section>

            </main>
        </div>
    )
}
