"use client";

import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function Home() {
  const comp = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.to("#welcome", {
        opacity: 1,
        y: "-=30",
        delay: 1,
      })
        .to("#welcome", {
          opacity: 0,
          y: "+=30",
          delay: 1,
        })
        .to("#intro", {
          opacity: 0,
          duration: 2,
          onUpdate: () => {
            gsap.to("#nextSlide", {
              opacity: 1,
            });
          },
        });
    }, comp);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={comp}
      className="fixed inset-x-0 bottom-0 z-10 h-screen w-full bg-black"
    >
      <div
        id="intro"
        className="z-10 flex h-screen place-items-center justify-center bg-black"
      >
        <div id="welcome" className="flex-center opacity-0">
          <Image
            src="/assets/images/dama-img.png"
            alt="logo"
            height={350}
            width={350}
          />
          <h1 className="text-9xl font-bold text-gray-100">Dobrodošli</h1>
        </div>
      </div>
      <div
        className="h-screen opacity-0"
        id="nextSlide"
        style={{ marginTop: "-100vh" }}
      >
        <Image
          src="/assets/images/barber-tools.png"
          width={1000}
          height={1000}
          alt="Barber tools"
          className="h-full w-full object-cover"
        />

        <div className="absolute left-1/2 top-0 mt-5 -translate-x-1/2">
          <Image
            src="/assets/images/dama-black.png"
            height={70}
            width={70}
            alt="Barber's logo"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="h1-bold text-4xl text-white sm:text-5xl lg:text-7xl">
            We will make you stylish
          </h1>
          <p className="paragraph-regular text-light-700">
            Discover the art of timeless grooming at our barbershop. Experience
            skilled craftsmanship and leave with a style that defines you.
          </p>
          <Link href="/add-reservation">
            <Button className="primary-gradient min-h-[46px] w-32 px-4 py-3 text-lg text-light-900 sm:w-40">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
