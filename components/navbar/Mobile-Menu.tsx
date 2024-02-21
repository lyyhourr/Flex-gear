"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import Route from "./Route";

export default function MobileMenu({ className }: { className: string }) {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <Sheet onOpenChange={setOpenSheet} open={openSheet}>
      <SheetTrigger>
        <Menu className={className} />
      </SheetTrigger>
      <SheetContent className="flex h-full items-center flex-col pt-20 gap-10 first-letter:uppercase">
        <Route setOpenSheet={setOpenSheet} />
      </SheetContent>
    </Sheet>
  );
}
