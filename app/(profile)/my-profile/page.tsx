import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";
import { getUserReservations } from "@/lib/actions/reservation.action";

const Page = async () => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserById({ userId: clerkId });
  const reservations = await getUserReservations({ userId: mongoUser._id });
  return (
    <div className="flex-center">
      <UserCard
        user={mongoUser}
        numberOfReservations={reservations.reservations.length}
      />
    </div>
  );
};

export default Page;
