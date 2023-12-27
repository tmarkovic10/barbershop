import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { getAllReservationsByDate } from "@/lib/actions/reservation.action";
import { SearchParamsProps } from "@/types";
import ReservationCard from "@/components/cards/ReservationCard";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  if (!mongoUser.admin) redirect("/add-reservation");

  const result = await getAllReservationsByDate({
    page: searchParams.page ? +searchParams.page : 1,
    filter: searchParams.date,
  });

  console.log(result);

  return (
    <>
      <div className="mt-9">
        <h1 className="h1-bold text-dark100_light900">Rezervacije</h1>
        <Filter />
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
                authorName={reservation.author.name}
                authorImage={reservation.author.picture}
                admin={mongoUser.admin}
              />
            ))
          ) : (
            <NoResult
              title="Trenutno nema rezervacija za odabrani datum"
              description="Odaberite drugi datum! 🌟"
            />
          )}
        </div>
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
