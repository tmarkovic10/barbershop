"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

const BottomNavbar = () => {
  const [active, setActive] = useState(1);
  let transition = "";
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname === "/my-profile") {
  //     setTransition("-translate-x-44");
  //   } else if (pathname === "/add-reservation") {
  //     setTransition("-translate-x-0");
  //   } else if (pathname === "/my-reservations") {
  //     setTransition("translate-x-44");
  //   }
  //   console.log("Render");
  // }, [pathname, active]);

  if (active === 0) {
    transition = "-translate-x-44";
  } else if (active === 1) {
    transition = "-translate-x-0";
  } else if (active === 2) {
    transition = "translate-x-44";
  }

  return (
    <nav className="shadow-light100_darknone background-light900_dark200 light-border sm:flex-center fixed inset-x-0 bottom-9 mx-auto hidden max-h-[4rem] max-w-[520px] rounded-xl border">
      <ul className="relative flex justify-around gap-[2rem]">
        <span
          className={`absolute ${transition} ${active === 0 && "mr-2.5"} ${
            active === 2 && "-mr-2"
          } primary-gradient -top-5 z-[-2] h-16 w-16 rounded-full`}
        ></span>
        {navLinks.map((item) => (
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
