import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 flex w-full p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex-center gap-3">
        <Image
          src="/assets/icons/barbers-favicon.svg"
          width={50}
          height={50}
          alt="Barber's"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Barber<span className="text-primary-500">&apos;s</span>
        </p>
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
      </div>
    </nav>
  );
};

export default Navbar;
