import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/fonts/font";
import Navbar from "@/components/navbar/Navbar";
import WishListProvider from "@/context/WishListContext";
import CartProvider from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Flex Gear",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <WishListProvider>
          <CartProvider>
            <body className={poppins.className}>
              <Toaster />
              <Navbar />
              <main className="pt-[70px]">{children}</main>
            </body>
          </CartProvider>
        </WishListProvider>
      </AuthProvider>
    </html>
  );
}