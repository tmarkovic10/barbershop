import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Image
        src="/assets/images/barber-tools.png"
        width={1000}
        height={1000}
        alt="Barber tools"
        className="h-full w-full object-cover"
      />

      <div className="absolute left-1/2 top-0 mt-5 -translate-x-1/2">
        <Image
          src="/assets/icons/barbers-favicon.svg"
          height={80}
          width={80}
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
        <Link href="/sign-in">
          <Button className="primary-gradient min-h-[46px] w-32 px-4 py-3 text-lg text-light-900 sm:w-40">
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
