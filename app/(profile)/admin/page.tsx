import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import AdminForm from "@/components/forms/AdminForm";
import { getAllReservations } from "@/lib/actions/reservation.action";
import { SearchParamsProps } from "@/types";

interface Reservations {
  employee: string;
  service: string;
  date: Date;
  time: string;
  author: {
    name: string;
    email: string;
  };
}

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const r = await getAllReservations({
    page: searchParams.page ? +searchParams.page : 1,
  });
  console.log(r.reservations);
  return (
    <>
      {mongoUser.admin && (
        <div className="mt-9">
          {/* <AdminForm reservations={r.reservations as Reservations[]} /> */}
        </div>
      )}
    </>
  );
};

export default Page;
