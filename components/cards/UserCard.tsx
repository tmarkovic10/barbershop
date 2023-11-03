import Image from "next/image";
import { format } from "date-fns";

interface UserCardProps {
  user: {
    name: string;
    email: string;
    picture: string;
    joinedAt: Date;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="card-wrapper flex-center mt-8 w-96 flex-col gap-8 px-12 py-6">
      <Image
        src={user.picture}
        alt="user profile picture"
        height={50}
        width={50}
        className="rounded-full"
      />
      <div className="text-center">
        <p className="paragraph-semibold text-dark500_light700">
          Ime i Prezime
        </p>
        <p className="text-light400_light500 capitalize">{user.name}</p>
      </div>
      <div className="text-center">
        <p className="paragraph-semibold text-dark500_light700">Email</p>
        <p className="text-light400_light500">{user.email}</p>
      </div>
      <div className="text-center">
        <p className="paragraph-semibold text-dark500_light700">
          Korisnik se pridružio
        </p>
        <p className="text-light400_light500">
          {format(user.joinedAt, "dd.MM.yyyy")}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
