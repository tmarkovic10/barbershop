"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { mode } = useTheme();
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 flex w-full p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/">
        <Image
          src={`${
            mode === "light"
              ? "/assets/images/dama-light.png"
              : "/assets/images/dama-dark.png"
          }`}
          width={66}
          height={66}
          alt="Barber's"
        />
      </Link>
      <div className="flex-between gap-5">
        <Theme />

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
