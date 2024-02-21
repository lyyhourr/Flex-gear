"use client"
import React, { useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { Search, X } from 'lucide-react'
import { productsData } from '@/data/products'
import { IProduct } from '@/types/types'
import ProductsCard from '../products-layout/Products-Card'

export default function SearchProduct({ className }: { className: string }) {
    const [userQuery, setUserQuery] = useState("")
    const [productsQuery, setProductsQuery] = useState<IProduct[] | null>(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    React.useEffect(() => {
        if (userQuery.length > 2) {
            const queryProducts = productsData.filter(product => product.productName.toLowerCase().includes(userQuery.toLowerCase().trim()) || product.productType.toLowerCase().includes(userQuery.toLowerCase().trim()))
            setProductsQuery(queryProducts)
        }
    }, [userQuery])

    return (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
            <DrawerTrigger><Search className={className} /></DrawerTrigger>
            <DrawerContent className='w-full h-screen '>
                <div className='flex justify-end w-full pr-2'>
                    <DrawerClose><X /></DrawerClose>
                </div>
                <main>
                    <div className='w-[95%] mx-auto pt-15'>
                        <input type="text" className='w-full bg-gray-100 rounded-sm p-2' value={userQuery} onChange={(e) => setUserQuery(e.target.value)} placeholder='search products here' />
                    </div>
                    {!productsQuery?.length && <p className='text-center pt-20 sm:py-5 text-lg '>No Results</p>}
                    {productsQuery && (
                        <section className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 py-2 px-1 border-b-2 overflow-auto border-gray-300 h-[70vh] sm:h-[80vh] gap-3 gap-y-5 xl:gap-14">
                            {
                                productsQuery.map((item, i) => (
                                    <ProductsCard key={i} cardData={item} setCloseDrawer={setOpenDrawer} />
                                ))
                            }

                        </section>
                    )}
                </main>
            </DrawerContent>
        </Drawer>

    )
}
