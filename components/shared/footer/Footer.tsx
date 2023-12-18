"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { social } from "@/constants";

const Footer = () => {
  const { mode } = useTheme();

  return (
    <div className="background-light850_dark100 flex-between w-full p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <div className="flex gap-6">
        <Image
          src={`${
            mode === "light"
              ? "/assets/images/dama-white.png"
              : "/assets/images/dama-black.png"
          }`}
          width={38}
          height={32}
          alt="Barber's"
        />
        <div>
          <ul className="flex flex-col gap-0.5">
            {social.map((item) => (
              <li key={item.title} className="flex gap-2">
                <Image
                  src={item.src}
                  alt={item.title}
                  height={17}
                  width={17}
                  className="invert-colors"
                />
                <p className="text-dark500_light700">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-dark500_light700">Sva prava pridržana</p>
    </div>
  );
};

export default Footer;
