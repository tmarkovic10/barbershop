"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteReservation } from "@/lib/actions/reservation.action";
import { usePathname } from "next/navigation";
import { isDateBeforeToday } from "@/lib/utils";

interface ReservationCardProps {
  _id: string;
  employee: string;
  service: string;
  date: Date;
  time: string;
  authorName?: string;
  authorImage?: string;
  admin?: boolean;
}

const ReservationCard = ({
  _id,
  employee,
  service,
  date,
  time,
  authorName,
  authorImage,
  admin,
}: ReservationCardProps) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    await deleteReservation({
      reservationId: JSON.parse(_id),
      path: pathname,
    });
  };

  return (
    <div className=" card-wrapper light-border relative flex w-full flex-col gap-6 rounded-[10px] border p-6 sm:max-w-[300px] sm:justify-normal">
      {authorName && (
        <div className="flex-center gap-3">
          <p className="paragraph-semibold text-dark500_light700">Gost</p>
          <p className="text-light400_light500 capitalize">{authorName}</p>
          <div className="overflow-hidden rounded-full">
            <Image
              src={authorImage!}
              height={27}
              width={27}
              alt="profile image"
            />
          </div>
        </div>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className={`absolute right-2 top-2 ${
              !admin && isDateBeforeToday(format(date, "dd.MM.yyyy"))
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!admin && isDateBeforeToday(format(date, "dd.MM.yyyy"))}
          >
            <Image
              src="/assets/icons/trash.svg"
              height={20}
              width={20}
              alt="trash"
              className="invert-colors"
            />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="background-light900_dark200  max-w-[300px] sm:max-w-[510px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark500_light700">
              Jeste li sigurni da želite izbrisati rezervaciju?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-light400_light500">
              Ova akcija se ne može poništiti. Brisanjem gubite vašu
              rezervaciju!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-dark500_light700">
              Odustani
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-dark500_light700"
              onClick={handleDelete}
            >
              Izbriši
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-around">
        <div className="flex w-[120px] flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700 text-center">
            Zaposlenik
          </p>
          <p className="text-light400_light500 text-center capitalize">
            {employee}
          </p>
        </div>
        <div className="flex w-[120px] flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700 text-center">
            Usluga
          </p>
          <p className="text-light400_light500 text-center capitalize">
            {service}
          </p>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex w-[120px] flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700 text-center">
            Datum
          </p>
          <p className="text-light400_light500 text-center">
            {format(date, "dd.MM.yyyy")}
          </p>
        </div>
        <div className="flex w-[120px] flex-col gap-1">
          <p className="paragraph-semibold text-dark500_light700 text-center">
            Vrijeme
          </p>
          <p className="text-light400_light500 text-center">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
