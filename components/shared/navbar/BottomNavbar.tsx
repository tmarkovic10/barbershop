"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { navLinks } from "@/constants";

const BottomNavbar = () => {
  const [active, setActive] = useState(1);
  const { mode } = useTheme();
  let transition = "";

  if (active === 0) {
    transition = "-translate-x-40";
  } else if (active === 1) {
    transition = "-translate-x-5";
  } else {
    transition = "translate-x-36";
  }
  return (
    <nav className="shadow-light100_darknone background-light900_dark200 light-border sm:flex-center fixed inset-x-0 bottom-9 mx-auto hidden max-h-[4rem] max-w-md rounded-xl border">
      <ul className="relative flex justify-center gap-[4.3rem]">
        <span
          className={`absolute ${transition} ${active === 0 && "mr-3"} ${
            active === 2 && "-mr-1"
          } primary-gradient -top-5 z-[-2] h-16 w-16 rounded-full`}
        ></span>
        {navLinks.map((item) => (
          <li key={item.id} className="text-dark100_light900 body-medium m-2.5">
            <Link
              href={item.linkTo}
              className="flex flex-col items-center pt-5 text-center"
              onClick={() => setActive(item.id)}
            >
              <span
                className={`cursor-pointer duration-500 ${
                  item.id === active && "-mt-7"
                }`}
              >
                <Image
                  src={mode === "light" ? item.iconLight : item.iconDark}
                  height={25}
                  width={25}
                  alt="nav icon"
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
