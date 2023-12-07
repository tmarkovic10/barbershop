import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex-center">
      <Skeleton className="flex-center mt-8 w-96 flex-col gap-8 px-12 py-6">
        <Skeleton className="h-[50px] w-[50px] rounded-full" />
        <div className="text-center">
          <div className="paragraph-semibold text-dark500_light700">
            Ime i Prezime
          </div>
          <Skeleton className="h-[24px]" />
        </div>

        <div className="text-center">
          <div className="paragraph-semibold text-dark500_light700">Email</div>
          <Skeleton className="h-[24px]" />
        </div>

        <div className="text-center">
          <div className="paragraph-semibold text-dark500_light700">
            Korisnik se pridružio
          </div>
          <Skeleton className="h-[24px]" />
        </div>

        <div className="text-center">
          <div className="paragraph-semibold text-dark500_light700">
            Broj rezervacija
          </div>
          <Skeleton className="h-[24px] w-full" />
        </div>
      </Skeleton>
    </div>
  );
};

export default Loading;
