import React from "react";
import Reservation from "@/components/forms/Reservation";

const Page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Book an appointment</h1>
      <div className="mt-9">
        <Reservation />
      </div>
    </div>
  );
};

export default Page;
