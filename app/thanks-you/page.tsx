"use client";
import { useAuth } from "@/context/AuthContext";
import { useCartProducts } from "@/context/CartContext";
import { bigShouldersText } from "@/fonts/font";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const { setCartProducts } = useCartProducts();
  const { isLogged } = useAuth();
  const [isUserLogged, setIsUserLogged] = useState<string | null>("true");
  useEffect(() => {
    setCartProducts(null), sessionStorage.removeItem("cart");
  }, []);
  useEffect(() => {
    setIsUserLogged(`${isLogged}`);
  }, [isLogged]);

  if (isUserLogged !== "true") {
    redirect("/");
  }

  return (
    <main className="container h-screen flex flex-col md:flex-row items-center lg:h-[80vh]">
      <section className="w-full flex justify-center">
        <Image
          src={"/thanks-you.png"}
          width={600}
          height={600}
          alt="thanks you img"
          className="w-[450px] lg:w-[500px]"
          unoptimized
        />
      </section>
      <section className="flex flex-col gap-2  justify-center w-full">
        <p
          className={`${bigShouldersText.className} text-5xl lg:text-8xl my-2 text-center`}
        >
          {" "}
          Order Confirmed !
        </p>
        <p className="text-sm lg:text-base">
          Stay tuned for updates and don't hesitate to reach out with any
          questions.{" "}
        </p>
        <p>Thanks again for choosing US !</p>
        <div className="flex justify-center my-2 lg:justify-start">
          <Link
            href={"/"}
            className="bg-red-500 px-5 py-2 rounded-sm lg:px-10 lg:py-5 text-white"
          >
            Back Homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
