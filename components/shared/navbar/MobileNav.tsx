"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

interface MobileNavProps {
  admin: boolean;
}

const NavContent = ({ admin }: MobileNavProps) => {
  const pathname = usePathname();

  const filteredNavLinks = navLinks.filter((item) => {
    if (item.admin && !admin) {
      return false;
    }
    return true;
  });

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {filteredNavLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.id}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"} `}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = ({ admin }: MobileNavProps) => {
  const { mode } = useTheme();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
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
        <div>
          <SheetClose asChild>
            <NavContent admin={admin} />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
