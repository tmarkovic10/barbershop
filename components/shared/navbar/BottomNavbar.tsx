"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants";

const BottomNavbar = () => {
  const [active, setActive] = useState(1);
  return (
    <nav className="shadow-light100_darknone background-light900_dark200 light-border flex-center fixed inset-x-0 bottom-9 mx-auto max-h-[4rem] rounded-xl border sm:max-w-md">
      <ul className="relative flex justify-center gap-[4.3rem]">
        <span
          className={`absolute ${navLinks[active].dis} ${
            navLinks[active].id === 0 && "mr-2"
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
                  src={item.iconLight}
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
