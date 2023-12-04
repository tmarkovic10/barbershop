import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Book an appointment</h1>
      <div className="mt-9">
        <div className="flex-center flex-col gap-8 sm:flex-row">
          <Skeleton className="h-[112px] w-full" />
          <Skeleton className="h-[112px]  w-full" />
        </div>

        <div className="flex-center mt-8 flex-col gap-8 sm:flex-row">
          <Skeleton className="h-[112px] w-full" />
          <Skeleton className="h-[112px] w-full" />
        </div>

        <div className="mt-8 flex w-full justify-start">
          <Skeleton className="h-[40px] w-28" />
        </div>
      </div>
    </>
  );
};

export default Loading;
