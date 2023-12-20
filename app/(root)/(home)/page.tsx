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
          delay: 1,
        })
        .to("#intro", {
          yPercent: "-100",
          duration: 0.3,
        });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="relative">
      <div
        className="flex-center absolute left-0 top-0 z-10 h-screen w-full bg-black"
        id="intro"
      >
        <div id="welcome" className="opacity-0">
          <Image
            src="/assets/images/dama-img.png"
            alt="logo"
            height={400}
            width={400}
          />
        </div>
      </div>

      <div id="nextSlide" className="relative h-screen w-full">
        <Image
          src="/assets/images/barber-tools.png"
          alt="background"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute left-0 top-10 flex w-full justify-center">
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
