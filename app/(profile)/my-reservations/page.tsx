import React from "react";
import { getUserReservations } from "@/lib/actions/reservation.action";
import ReservationCard from "@/components/cards/ReservationCard";

const Page = async () => {
  const result = await getUserReservations({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Moje Rezervacije</h1>
      <div className="flex flex-wrap gap-12">
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
    </>
  );
};

export default Page;
