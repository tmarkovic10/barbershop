"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

interface BottomNavbarProps {
  admin: boolean;
}
interface TransitionMap {
  [key: number]: string;
}

const BottomNavbar = ({ admin }: BottomNavbarProps) => {
  const [active, setActive] = useState(1);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/my-profile") {
      setActive(0);
    } else if (pathname === "/add-reservation") {
      setActive(1);
    } else if (pathname === "/my-reservations") {
      setActive(2);
    } else if (pathname === "/admin") {
      setActive(3);
    }
  }, [pathname, active]);

  const transitions: TransitionMap = {
    0: !admin ? "-translate-x-44" : "-translate-x-[13.5rem]",
    1: !admin ? "translate-x-0" : "-translate-x-[4.6rem]",
    2: !admin ? "translate-x-44" : "translate-x-[4.3rem]",
    3: admin ? "translate-x-[13.8rem]" : "",
  };

  const transition: string = transitions[active] || "";

  const filteredNavLinks = navLinks.filter((item) => {
    if (item.admin && !admin) {
      return false;
    }
    return true;
  });

  return (
    <nav className="shadow-light100_darknone background-light900_dark200 light-border sm:flex-center fixed inset-x-0 bottom-9 mx-auto hidden max-h-[4rem] max-w-[550px] rounded-xl border">
      <ul
        className={`relative flex justify-around ${
          admin ? "gap-[0rem]" : "gap-[2rem]"
        }`}
      >
        <span
          className={`absolute ${transition} ${
            active === 0 ? "mr-2.5" : active === 2 ? "-mr-2" : ""
          } translate-y-0.5 ${
            active !== undefined ? "opacity-100" : "opacity-0"
          } primary-gradient -top-5 z-[-2] h-16 w-16 rounded-full duration-700`}
        ></span>
        {filteredNavLinks.map((item) => (
          <li
            key={item.id}
            className="text-dark100_light900 body-medium m-2.5 w-32"
          >
            <Link
              href={item.route}
              className="flex-center flex-col pt-5 text-center"
              onClick={() => setActive(item.id)}
            >
              <span
                className={`cursor-pointer duration-500 ${
                  item.id === active && "-mt-7"
                }`}
              >
                <Image
                  src={item.icon}
                  height={25}
                  width={25}
                  alt="nav icon"
                  className="invert-colors"
                />
              </span>
              <span
                className={`${
                  active === item.id
                    ? "mt-2 translate-y-3 opacity-100 duration-700"
                    : "translate-y-10 opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
