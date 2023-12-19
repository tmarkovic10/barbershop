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
    <div className=" card-wrapper light-border relative flex w-full flex-col gap-6 rounded-[10px] border px-2 py-6 sm:max-w-[300px] sm:justify-normal">
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <p className="absolute right-2 top-2 cursor-pointer">
            <Image
              src="/assets/icons/trash.svg"
              height={20}
              width={20}
              alt="trash"
              className="invert-colors"
            />
          </p>
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
            <AlertDialogAction className="text-dark500_light700">
              Izbriši
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
