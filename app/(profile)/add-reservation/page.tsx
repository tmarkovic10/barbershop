import React from "react";
import Reservation from "@/components/forms/Reservation";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { getAllReservations } from "@/lib/actions/reservation.action";
import { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  if (mongoUser.admin) redirect("/admin");

  const reservations = await getAllReservations({
    page: searchParams.page ? +searchParams.page : 1,
  });
  const dateAndTime = reservations.reservations.map((item) => ({
    date: item.date,
    time: item.time,
  }));

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Book an appointment</h1>
      <div className="mt-9">
        <Reservation
          mongoUserId={JSON.stringify(mongoUser?._id)}
          dateAndTime={dateAndTime}
        />
      </div>
    </>
  );
};

export default Page;
