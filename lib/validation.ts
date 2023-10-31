import * as z from "zod";

export const ReservationSchema = z.object({
  employee: z.string().min(1, { message: "Odaberite jednog od zaposlenika!" }),
  service: z.string().min(1, { message: "Odaberite jednu od usluga!" }),
  date: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
  time: z.string().min(1, { message: "Odaberite vrijeme!" }),
});
