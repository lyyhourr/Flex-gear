"use client";
import { useAuth } from "@/context/AuthContext";
import { imbPlexSans } from "@/fonts/font";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const { isLogged, setIsLogged } = useAuth();
  const [isUserLogged, setIsUserLogged] = useState<string | null>(null);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const account = {
    username: "Admin",
    password: "123",
  };

  useEffect(() => {
    if (!isUserLogged) {
      setIsUserLogged(`${isLogged}`);
    }
  }, [isLogged]);

  if (isUserLogged === "true") {
    redirect("/");
  }

  const validation = () => {
    if (username !== account.username) {
      toast.error("incorrect username");
      return false;
    } else if (password !== account.password) {
      toast.error("incorrect password");
      return false;
    } else {
      return true;
    }
  };

  const handleLogIn = (e: any) => {
    e.preventDefault();
    const validate = validation();
    if (validate) {
      sessionStorage.setItem("isLogged", "true");
      setIsLogged(true);
      toast.success("logged in");
      router.back();
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="h-[calc(100vh-70px)] flex items-center justify-center">
      <form
        className="flex flex-col rounded-lg shadow-xl p-5 w-[350px] sm:w-[500px] gap-5 "
        onSubmit={handleLogIn}
      >
        <h1 className={`${imbPlexSans.className} text-4xl text-center py-4`}>
          Sign in{" "}
        </h1>
        <p className="text-gray-500 text-center">sign in to continue</p>
        <input
          type="text"
          className="border-b border-gray-400 px-2 py-1 text-lg"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border-b border-gray-400 px-2 py-1 text-lg"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center ">
          <button className="bg-red-500 px-5 py-3 rounded-sm text-white">
            Log in
          </button>
          <p className="text-red-500 underline">Forget password?</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Demo acc:</p>
          <p className="text-sm text-gray-400">
            ({account.username}) ({account.password})
          </p>
        </div>
      </form>
    </div>
  );
}
