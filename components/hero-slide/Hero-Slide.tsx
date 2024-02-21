"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const slideImg = ["rog", "mac", "iphone15", "msi"];
export default function HeroSlide() {
  const [onSlide, setOnSlide] = useState(0);

  const NextSlide = () => {
    setOnSlide((p) => (p === slideImg.length - 1 ? 0 : p + 1));
  };
  const PrevSlide = () => {
    setOnSlide((p) => (p === 0 ? slideImg.length - 1 : p - 1));
  };
  useEffect(() => {
    setTimeout(() => {
      NextSlide();
    }, 5000);
  }, [onSlide]);
  return (
    <div className="relative w-screen overflow-hidden h-full group">
      <div
        className="flex duration-1000"
        style={{ transform: `translateX(-${onSlide * 100}%)` }}
      >
        {slideImg.map((item, i) => (
          <Image
            key={i}
            src={`/banners/${item}.jpg`}
            width={100000}
            height={100000}
            alt={item}
            priority
            unoptimized
            className="h-[200px] sm:h-[250px] md:h-[350px] w-screen lg:h-[550px] object-cover shrink-0"
          />
        ))}
      </div>
      <div className="lg:hidden flex group-hover:flex justify-between absolute h-full items-center w-full top-0 px-1 lg:px-3">
        <button className=" bg-gray-200 rounded-full" onClick={PrevSlide}>
          <ChevronLeft />
        </button>
        <button className=" bg-gray-200 rounded-full" onClick={NextSlide}>
          <ChevronRight />
        </button>
      </div>
      <div className="absolute w-full flex justify-center bottom-3 gap-2">
        {slideImg.map((item, i) => (
          <button
            key={i}
            className="w-2 h-2 bg-gray-600 rounded-full"
            onClick={() => setOnSlide(i)}
            style={{ opacity: onSlide === i ? "100%" : "30%" }}
          ></button>
        ))}
      </div>
    </div>
  );
}
