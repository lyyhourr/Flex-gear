"use client";
import { ICartProducts } from "@/types/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ICartContext {
  cartProducts: ICartProducts[] | null;
  setCartProducts: Dispatch<SetStateAction<ICartProducts[] | null>>;
}

export const CartProductsContext = createContext<ICartContext | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {

  const cartStorage = typeof sessionStorage !== "undefined" ? JSON.parse(sessionStorage.getItem("cart") as any) : null
  const [cartProducts, setCartProducts] = useState<ICartProducts[] | null>(cartStorage || null);

  useEffect(() => {
    if (cartProducts !== null) {
      sessionStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])




  const contextValue: ICartContext = {
    cartProducts,
    setCartProducts,
  };

  return (
    <CartProductsContext.Provider value={contextValue}>
      {children}
    </CartProductsContext.Provider>
  );
}

export const useCartProducts = () => {
  const context = useContext(CartProductsContext);
  if (!context) {
    throw new Error("useCartProducts must be used within a CartProductsContext");
  }
  return context;
};

