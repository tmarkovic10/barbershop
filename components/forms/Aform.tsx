"use client";

import ReservationCard from "../cards/ReservationCard";
import NoResult from "../shared/NoResult";

interface Reservations {
  _id: string;
  employee: string;
  service: string;
  date: Date;
  time: string;
  author: {
    _id: string;
    name: string;
    email: string;
    picture: string;
  };
}

interface Props {
  reservations: Reservations[];
}

const Aform = ({ reservations }: Props) => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Moje Rezervacije</h1>
      <div className="mt-9 flex flex-wrap gap-6 sm:gap-12">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
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
        ) : (
          <NoResult
            title="Još nemate rezervacija"
            description="Rezervirajte svoj prvi termin! 🌟"
            link="/add-reservation"
            linkTitle="Rezervirajte Sada"
          />
        )}
      </div>
    </>
  );
};

export default Aform;
