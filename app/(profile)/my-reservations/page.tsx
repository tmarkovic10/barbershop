import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserReservations } from "@/lib/actions/reservation.action";
import ReservationCard from "@/components/cards/ReservationCard";
import { getUserById } from "@/lib/actions/user.action";

const Page = async () => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getUserReservations({ userId: mongoUser._id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Moje Rezervacije</h1>
      <div className="mt-9 flex flex-wrap gap-6 sm:gap-12">
        {result.length > 0
          ? result.map((reservation) => (
              <ReservationCard
                key={reservation._id}
                _id={reservation._id}
                employee={reservation.employee}
                service={reservation.service}
                date={reservation.date}
                time={reservation.time}
                author={reservation.author}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default Page;
