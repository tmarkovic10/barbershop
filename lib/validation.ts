import * as z from "zod";

export const ReservationSchema = z.object({
  employee: z.string().min(1, { message: "Odaberite jednog od zaposlenika!" }),
  service: z.string().min(1, { message: "Odaberite jednu od usluga!" }),
  date: z.date({ required_error: "Odaberite datum! " }),
  time: z.string().min(1, { message: "Odaberite vrijeme!" }),
});

export const AdminSchema = z.object({
  employee: z.string().min(1, { message: "Odaberite jednog od zaposlenika!" }),
  date: z.date({ required_error: "Odaberite datum! " }),
});
