import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { getAllReservations } from "@/lib/actions/reservation.action";
import { SearchParamsProps } from "@/types";
import format from "date-fns/format";
import ReservationCard from "@/components/cards/ReservationCard";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/Filter";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const result = await getAllReservations({});

  const filteredReservations = (
    employeeFilter: string | undefined,
    dateFilter: string | undefined
  ) => {
    return result.reservations.filter((reservation) => {
      const employeeMatch =
        !employeeFilter || reservation.employee === employeeFilter;

      const dateMatch =
        !dateFilter || format(reservation.date, "dd/MM/yyyy") === dateFilter;

      return (!employeeFilter || employeeMatch) && (!dateFilter || dateMatch);
    });
  };

  const filteredResult = filteredReservations(
    searchParams.employee,
    searchParams.date
  );
  // console.log("RESULT", result);
  // console.log("FILTERED RESULT", filteredResult);

  return (
    <>
      {mongoUser.admin && (
        <div className="mt-9">
          <h1 className="h1-bold text-dark100_light900">Rezervacije</h1>
          <Filter />
          <div className="mt-9 flex flex-wrap gap-6 sm:gap-12">
            {filteredResult.length > 0 ? (
              filteredResult.map((reservation) => (
                <ReservationCard
                  key={reservation._id}
                  _id={JSON.stringify(reservation._id)}
                  employee={reservation.employee}
                  service={reservation.service}
                  date={reservation.date}
                  time={reservation.time}
                  authorName={reservation.author.name}
                  authorImage={reservation.author.picture}
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
      )}
    </>
  );
};

export default Page;
