"use client"
import NoProduct from "@/components/NoProduct";
import { useCartProducts } from "@/context/CartContext";
import { useWishListProducts } from "@/context/WishListContext";
import { inter } from "@/fonts/font";
import { IWishListProducts } from "@/types/types";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WishList() {

  const { wishListProducts, setWishListProducts } = useWishListProducts()
  const { cartProducts, setCartProducts } = useCartProducts()
  const [wishListData, setWishListData] = useState<IWishListProducts[] | null>(null)

  useEffect(() => {
    setWishListData(wishListProducts ? wishListProducts : null)
  }, [wishListProducts])

  const handleRemoveProductFromWishList = (productName: string) => {
    const removeProduct = wishListData ? wishListData?.filter(item => item.name !== productName) : null
    setWishListProducts(removeProduct)
  }

  const handleMoveAllProductsToCart = () => {
    const moveAllProductsToCart = wishListData && cartProducts ? [...cartProducts, ...wishListData] : wishListData
    setCartProducts(moveAllProductsToCart)
    setWishListProducts(null)
  }

  const handleMoveProductToCart = (productData: IWishListProducts) => {
    const { image, isDiscount, name, price, priceAfterDiscount, qty } = productData
    const productInWishList: IWishListProducts = {
      image, isDiscount, name, price, priceAfterDiscount, qty
    }
    const updateCartProducts = cartProducts ? [...cartProducts, productInWishList] : [productInWishList]
    setCartProducts(updateCartProducts)
    const removeProductFromWishListAfterMoveToCart = wishListProducts ? wishListProducts.filter(item => item.name !== name) : null
    setWishListProducts(removeProductFromWishListAfterMoveToCart)
  }


  if (!wishListData?.length) {
    return <NoProduct title="Wish List" />
  }

  return <main className={` container ${inter.className} py-3 px-3 lg:px-5 flex flex-col gap-5`}>
    <section className="w-full flex justify-between items-center text-lg">
      <p>Wishlist ({wishListData?.length})</p>
      <button className=" hover:text-red-500 py-2 px-3 border-2 rounded-sm" onClick={handleMoveAllProductsToCart}>Move All to Cart</button>
    </section>
    <section className="flex flex-wrap gap-4 justify-start">
      {wishListData && wishListData.length &&
        wishListData.map((item, i) => (
          <div className="flex flex-col gap-3 w-[180px] lg:w-[250px]" key={i}>
            <div className="bg-gray-100 flex flex-col relative">
              <Image
                src={`/categories${item.image}`}
                width={300}
                height={300}
                alt={item.name}
                className="w-[180px] h-[180px] lg:w-[250px] lg:p-7 object-scale-down"
                unoptimized
              />
              <button className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-300 group" onClick={() => handleRemoveProductFromWishList(item.name)}><Trash2 className="w-5 h-5 group-hover:text-red-500" /></button>
              {
                item.isDiscount && (
                  <button className="absolute top-0 left-0 px-2 text-sm py-1 text-white bg-red-500 rounded-md">{item.discountPercentage}%</button>
                )
              }
              <button className="w-full bg-black text-white py-3 text-sm flex gap-2 items-center justify-center hover:bg-slate-800"
                onClick={() => handleMoveProductToCart(item)}>
                <ShoppingCart className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                Move To Cart
              </button>
            </div>
            <p className="first-letter:uppercase">{item.name}</p>
            {
              item.isDiscount ? (
                <div className="flex items-center gap-2">
                  <p className="text-red-500">$ {item.priceAfterDiscount}</p>
                  <p className="text-gray-400 line-through text-sm">$ {item.price}</p>
                </div>
              ) : (
                <p className="text-red-500">$ {item.price}</p>
              )
            }
          </div>
        ))
      }
    </section>
  </main >
}