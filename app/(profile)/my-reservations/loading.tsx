import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";
import { getUserReservations } from "@/lib/actions/reservation.action";
import { getUserById } from "@/lib/actions/user.action";

const Loading = async () => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  const result = await getUserReservations({ userId: mongoUser._id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Moje Rezervacije</h1>
      <div className="mt-9 flex flex-wrap gap-6 sm:gap-12">
        {result.map((item) => (
          <Skeleton
            key={item._id}
            className="flex h-[169.6px] w-full gap-10 rounded-[10px] p-6 sm:max-w-[300px]"
          />
        ))}
      </div>
    </>
  );
};

export default Loading;
