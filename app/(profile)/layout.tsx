import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import BottomNavbar from "@/components/shared/navbar/BottomNavbar";
import Footer from "@/components/shared/footer/Footer";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />

      <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </section>
      <BottomNavbar admin={mongoUser?.admin} />
      <Footer />
    </main>
  );
};

export default Layout;
