"use client";
import { useAuth } from "@/context/AuthContext";
import { useCartProducts } from "@/context/CartContext";
import { useWishListProducts } from "@/context/WishListContext";
import { cn } from "@/lib/utils";
import { ICartProducts, IProduct, IWishListProducts } from "@/types/types";
import { ChevronsRight, Heart, ShoppingCart, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductsCard({ cardData, setCloseDrawer }: { cardData: IProduct, setCloseDrawer?: any }) {
  const {
    image,
    price,
    productName,
    rating,
    discountPercentage,
    isDiscount,
    id,
    category,
  } = cardData;
  const { cartProducts, setCartProducts } = useCartProducts();
  const { setWishListProducts, wishListProducts } = useWishListProducts();
  const { isLogged } = useAuth()
  const [isUserLogged, setIsUserLogged] = useState<string | null>(null)

  const router = useRouter()

  const [allProductsNameInWishList, setAllProductsNameInWishList] = useState<
    string[] | null
  >(null);
  const [allProductsNameInCart, setAllProductsNameInCart] = useState<
    string[] | null
  >(null);


  const priceAfterDiscount =
    isDiscount && discountPercentage
      ? price - (price * discountPercentage) / 100
      : price;

  useEffect(() => {
    if (wishListProducts) {
      setAllProductsNameInWishList(wishListProducts.map((item) => item.name));
    }
  }, [wishListProducts]);

  useEffect(() => {
    if (cartProducts) {
      setAllProductsNameInCart(cartProducts.map((item) => item.name));
    }
  }, [cartProducts]);
  useEffect(() => {
    setIsUserLogged(`${isLogged}`)
  }, [isLogged])

  const checkSessionProducts = (data: string[] | null) => {
    return data?.some((item) => item.includes(productName));
  };

  const clickedProduct: IWishListProducts | ICartProducts = {
    name: productName,
    price,
    image,
    priceAfterDiscount,
    qty: 1,
    isDiscount,
    discountPercentage
  };
  const handleAddToCart = () => {

    if (isUserLogged !== "true") {
      router.push("/sign-in")
      toast("sign in to continue")
      return;
    }

    setCartProducts(
      cartProducts ? [...cartProducts, clickedProduct] : [clickedProduct]
    );
    const removeIfProductInWishList = wishListProducts ? wishListProducts.filter(item => item.name !== productName) : null
    setWishListProducts(removeIfProductInWishList)
  };

  const handleWishListProducts = (addedProductName: string) => {
    if (isUserLogged !== "true") {
      router.push("/sign-in")
      toast("sign in to continue")
      return;
    }
    const existingProducts = wishListProducts?.some((item) =>
      item.name.includes(addedProductName)
    );
    if (!existingProducts) {
      setWishListProducts(
        wishListProducts
          ? [...wishListProducts, clickedProduct]
          : [clickedProduct]
      );
    } else {
      const removeDuplicateProducts = wishListProducts!.filter(
        (item) => item.name !== productName
      );
      setWishListProducts(removeDuplicateProducts);
    }
  };

  return (
    <main className={`flex  flex-col gap-2 group `}>
      <section className="bg-gray-100 flex w-full items-center justify-center py-3 h-[140px] sm:h-[250px] relative">
        <Image
          src={`/categories${image}`}
          width={1000000}
          height={1000000}
          alt="flash sale item"
          className="w-[110px]  sm:w-[150px]  lg:w-[170px]  object-cover"
          unoptimized
        />

        {isDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-sm sm:text-base px-1 py-[2px] sm:px-2 sm:py-1 rounded-md ">
            <p>-{discountPercentage}%</p>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-1 items-center justify-center ">
          <button
            className="bg-white rounded-full p-1"
            onClick={() => handleWishListProducts(productName)}
          >
            <Heart
              className={cn(
                "w-5 h-5",
                checkSessionProducts(allProductsNameInWishList) &&
                "text-red-500 fill-red-500"
              )}
            />
          </button>
          {!checkSessionProducts(allProductsNameInCart) && (
            <button
              className="bg-white rounded-full p-1"
              onClick={() => handleAddToCart()}
            >
              <ShoppingCart className=" w-5 h-5" />
            </button>
          )}
        </div>
        {checkSessionProducts(allProductsNameInCart) && (
          <div className="absolute top-2 w-full h-full flex justify-center items-center z-10 bg-black bg-opacity-40">
            <p className=" bg-black text-white p-1 ">item in cart</p>
          </div>
        )}
      </section>
      <section className="flex flex-col lg:gap-2">
        <p className="text-lg line-clamp-1 ">{productName}</p>
        <div className="flex items-center gap-2 text-sm">
          {discountPercentage && isDiscount ? (
            <>
              <p className="text-red-500 ">${priceAfterDiscount}</p>
              <p className="text-gray-500 line-through">${price}</p>
            </>
          ) : (
            <p className="text-red-500 ">${price}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex text-gray-400 items-center text-sm lg:text-base">
            {Array.from({ length: rating }).map((item: any, i: number) => (
              <StarIcon
                key={i}
                className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4 lg:h-5 lg:w-5 fill-yellow-500 "
              />
            ))}
            {Array.from({ length: 5 - rating }).map((item: any, i: number) => (
              <StarIcon
                key={i}
                className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4 lg:h-5 lg:w-5 fill-gray-300 "
              />
            ))}
            ({rating})
          </div>
          <Link
            href={`/product-details/${category}-${id}`}
            className="flex text-red-500 items-center"
            onClick={setCloseDrawer ? () => setCloseDrawer(false) : () => { }}
          >
            view
            <ChevronsRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
