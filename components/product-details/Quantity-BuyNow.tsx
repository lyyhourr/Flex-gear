"use client";
import { useAuth } from "@/context/AuthContext";
import { useCartProducts } from "@/context/CartContext";
import { useWishListProducts } from "@/context/WishListContext";
import { cn } from "@/lib/utils";
import { ICartProducts, IProduct, IWishListProducts } from "@/types/types";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function QuantityBuyNow({ product }: { product: IProduct }) {
  const { image, isDiscount, productName, discountPercentage, price } = product;
  const { setWishListProducts, wishListProducts } = useWishListProducts();
  const { cartProducts, setCartProducts } = useCartProducts();
  const [productData, setProductData] = useState<ICartProducts[] | null>();
  const [quantity, setQuantity] = useState(1);

  const { isLogged, setIsLogged } = useAuth()
  const [isUserLogged, setIsUserLogged] = useState<string | null>(null)
  useEffect(() => {
    if (!isUserLogged) {
      setIsUserLogged(`${isLogged}`)
    }
  }, [isLogged])
  const router = useRouter()

  const priceAfterDiscount = discountPercentage
    ? price - (price * discountPercentage) / 100
    : 0;
  const newProducts: IWishListProducts | ICartProducts = {
    image,
    isDiscount,
    name: productName,
    price,
    priceAfterDiscount: priceAfterDiscount,
    qty: quantity,
  };

  const handleCheckItem = (data: any) => {
    return data?.some((item: any) => item.name.includes(productName));
  };

  const handleAddToCart = () => {
    if (isUserLogged !== "true") {
      toast("Log in to continue")
      router.push("/sign-in")
      return;
    }
    const addToCart = productData
      ? [...productData, newProducts]
      : [newProducts];
    setCartProducts(addToCart);
    toast.success("Added to cart")
  };

  const handleAddToWishList = () => {

    if (isUserLogged !== "true") {
      toast("Log in to continue")
      router.push("/sign-in")
      return;
    }

    const productsAlreadyInWishList = handleCheckItem(wishListProducts);
    if (productsAlreadyInWishList) {
      const removeDuplicate = wishListProducts?.filter(
        (item) => item.name !== productName
      );
      setWishListProducts(removeDuplicate ? removeDuplicate : null);
      toast.success("Remove from wishlist")
    } else {
      const addToWishList = wishListProducts
        ? [...wishListProducts, newProducts]
        : [newProducts];
      setWishListProducts(addToWishList);
      toast.success("Added to wishlist")
    }
  };
  useEffect(() => {
    if (cartProducts) {
      setProductData(cartProducts ? cartProducts : null);
    }
  }, [cartProducts]);



  const WishListButton = () => (
    <button
      className="border rounded-sm p-3 border-gray-500 hover:bg-red-500 group"
      onClick={handleAddToWishList}
    >
      <Heart
        className={cn(
          "group-hover:text-white group-hover:fill-white",
          handleCheckItem(wishListProducts) && "text-red-500 fill-red-500"
        )}
      />
    </button>
  )

  return (
    <div className="flex items-center justify-between  flex-col lg:flex-row w-full gap-4 lg:gap-0">
      {
        !handleCheckItem(productData) && (

          <section className="flex items-center justify-between  w-full lg:w-fit">
            <div className="flex items-center">
              <button
                className="py-3 px-5 rounded-l-sm text-xl border border-gray-500 hover:bg-gray-100"
                onClick={() => setQuantity((p) => p - 1)}
              >
                -
              </button>
              <div className="px-8 py-3 text-xl border  border-gray-500">
                {quantity}
              </div>
              <button
                className="py-3 px-5 rounded-r-sm text-xl border border-red-500 bg-red-500 text-white hover:bg-red-600"
                onClick={() => setQuantity((p) => p + 1)}
              >
                +
              </button>
            </div>
            <div className="lg:hidden">
              <WishListButton />
            </div>
          </section>
        )
      }

      {handleCheckItem(productData) ? (
        <Link
          className=" rounded-sm py-3 text-center bg-black underline hover:bg-slate-800 text-white h-full w-full "
          href={"/cart"}
        >
          This item is in cart
        </Link>
      ) : (
        <button
          className="lg:px-16 rounded-sm py-3 text-center bg-red-500 text-white h-full w-full lg:w-fit"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
      {
        !handleCheckItem(productData) && (
          <div className="hidden lg:block">
            <WishListButton />
          </div>
        )
      }
    </div>
  );
}
