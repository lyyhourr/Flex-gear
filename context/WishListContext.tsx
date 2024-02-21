"use client";
import { IWishListProducts } from "@/types/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IWishListContext {
  wishListProducts: IWishListProducts[] | null;
  setWishListProducts: Dispatch<SetStateAction<IWishListProducts[] | null>>;
}

export const WishListContext = createContext<IWishListContext | null>(null);

export default function WishListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wishListStorage =
    typeof sessionStorage !== "undefined"
      ? JSON.parse(sessionStorage.getItem("wishlist") as any)
      : null;
  const [wishListProducts, setWishListProducts] = useState<
    IWishListProducts[] | null
  >(wishListStorage || null);
  useEffect(() => {
    if (wishListProducts !== null) {
      sessionStorage.setItem("wishlist", JSON.stringify(wishListProducts));
    }
  }, [wishListProducts]);

  const contextValue: IWishListContext = {
    wishListProducts,
    setWishListProducts,
  };

  return (
    <WishListContext.Provider value={contextValue}>
      {children}
    </WishListContext.Provider>
  );
}

export const useWishListProducts = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error(
      "useWishListProducts must be used within a WishListProvider"
    );
  }
  return context;
};
