import React from "react";
import Reservation from "@/components/forms/Reservation";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const Page = async () => {
  // const { userId } = auth();
  const userId = "john_doe";

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Book an appointment</h1>
      <div className="mt-9">
        <Reservation mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </>
  );
};

export default Page;
