import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import UserCard from "@/components/cards/UserCard";

const Page = async () => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserById({ userId: clerkId });

  return (
    <div className="flex-center">
      <UserCard user={mongoUser} />
    </div>
  );
};

export default Page;
