import React from "react";
import { format } from "date-fns";
import Image from "next/image";

interface ReservationCardProps {
  _id: string;
  employee: string;
  service: string;
  date: Date;
  time: string;
  author?: {
    _id: string;
    name: string;
    picture: string;
  };
}

const ReservationCard = ({
  employee,
  service,
  date,
  time,
  author,
}: ReservationCardProps) => {
  return (
    <div className="card-wrapper flex w-full flex-col gap-6 rounded-[10px] px-2 py-6 sm:max-w-[300px] sm:justify-normal">
      {author && (
        <div className="flex-center gap-3">
          <p className="paragraph-semibold text-dark500_light700">Gost</p>
          <p className="text-light400_light500 capitalize">{author.name}</p>
          <div className="overflow-hidden rounded-full">
            <Image
              src={author.picture}
              height={27}
              width={27}
              alt="profile image"
            />
          </div>
        </div>
      )}
      <div className="flex justify-around">
        <div className="flex flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700">Zaposlenik</p>
          <p className="text-light400_light500 capitalize">{employee}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700">Usluga</p>
          <p className="text-light400_light500 capitalize">{service}</p>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700">Datum</p>
          <p className="text-light400_light500">{format(date, "dd.MM.yyyy")}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700">Vrijeme</p>
          <p className="text-light400_light500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
