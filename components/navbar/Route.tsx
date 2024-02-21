"use client";
import { useAuth } from "@/context/AuthContext";
import { imbPlexSans } from "@/fonts/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

const routes = ["home", "contact", "about"];

export default function Route({
  setOpenSheet,
}: {
  setOpenSheet?: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const { isLogged, setIsLogged } = useAuth();
  const [isUserLogged, setIsUserLogged] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    setIsUserLogged(`${isLogged}`);
  }, [isLogged]);
  const handleLogOut = () => {
    setIsLogged(false);
    router.refresh()
    setOpenSheet && setOpenSheet(false);
    toast.success("Logged Out");
  };
  const LinkRoute = ({ text }: { text: string }) => (
    <Link
      href={`/${text === "home" ? "" : text}`}
      className={cn(
        `${imbPlexSans.className} text-lg first-letter:uppercase `,
        pathname.includes(text) && "text-red-500"
      )}
      onClick={setOpenSheet ? () => setOpenSheet(false) : () => { }}
    >
      {text === "sign-in" ? "sign in" : text}
    </Link>
  );
  console.log(isLogged)
  return (
    <>
      {routes.map((item) => (
        <LinkRoute text={item} key={item} />
      ))}
      {isUserLogged === "true" ? (
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md"
          onClick={handleLogOut}
        >
          Sign out
        </button>
      ) : (
        <LinkRoute text="sign-in" />
      )}
    </>
  );
}
