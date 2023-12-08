import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserReservations } from "@/lib/actions/reservation.action";
import ReservationCard from "@/components/cards/ReservationCard";
import { getUserById } from "@/lib/actions/user.action";
import Pagination from "@/components/shared/Pagination";
import { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getUserReservations({
    userId: mongoUser._id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Moje Rezervacije</h1>
      <div className="mt-9 flex flex-wrap gap-6 sm:gap-12">
        {result.reservations.length > 0
          ? result.reservations.map((reservation) => (
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
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
