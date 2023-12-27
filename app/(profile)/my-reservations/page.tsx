import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserReservations } from "@/lib/actions/reservation.action";
import ReservationCard from "@/components/cards/ReservationCard";
import { getUserById } from "@/lib/actions/user.action";
import Pagination from "@/components/shared/Pagination";
import { SearchParamsProps } from "@/types";
import NoResult from "@/components/shared/NoResult";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId: clerkId } = auth();

  const mongoUser = await getUserById({ userId: clerkId });

  const result = await getUserReservations({
    userId: mongoUser._id,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Moje Rezervacije</h1>
      <div className="mt-9 flex flex-wrap gap-6 sm:gap-12">
        {result.reservations.length > 0 ? (
          result.reservations.map((reservation) => (
            <ReservationCard
              key={reservation._id}
              _id={JSON.stringify(reservation._id)}
              employee={reservation.employee}
              service={reservation.service}
              date={reservation.date}
              time={reservation.time}
              admin={mongoUser.admin}
            />
          ))
        ) : (
          <NoResult
            title="Još nemate rezervacija"
            description="Rezervirajte svoj prvi termin! 🌟"
            link="/add-reservation"
            linkTitle="Rezervirajte Sada"
          />
        )}
      </div>
      {result.reservations.length > 0 && (
        <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
        </div>
      )}
    </>
  );
};

export default Page;
