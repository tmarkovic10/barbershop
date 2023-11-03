"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputCard from "../cards/InputCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useRouter, usePathname } from "next/navigation";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { availableTimes, services } from "@/constants";
import { Button } from "../ui/button";
import { ReservationSchema } from "@/lib/validation";
import { createReservation } from "@/lib/actions/reservation.action";

interface Props {
  mongoUserId: string;
}

const Reservation = ({ mongoUserId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log(isSubmitting);
  const router = useRouter();
  const pathname = usePathname();
  const today = new Date();
  const threeMonthsFromToday = new Date(today);
  threeMonthsFromToday.setMonth(today.getMonth() + 3);
  const form = useForm<z.infer<typeof ReservationSchema>>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      employee: "",
      service: "",
      date: new Date(),
      time: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ReservationSchema>) {
    setIsSubmitting(true);

    try {
      await createReservation({
        employee: values.employee,
        service: values.service,
        date: values.date,
        time: values.time,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      router.push("/my-reservations");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-center flex-col gap-8 sm:flex-row">
          <FormField
            control={form.control}
            name="employee"
            render={({ field }) => (
              <InputCard>
                <FormItem>
                  <FormLabel className="paragraph-regular text-dark500_light700">
                    Odaberite zaposlenika
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border px-5 py-2.5">
                        <SelectValue placeholder="Zaposlenik" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="background-light900_dark200">
                      <SelectItem value="damir">Damir</SelectItem>
                      <SelectItem value="josip">Josip</SelectItem>
                      <SelectItem value="branko">Branko</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              </InputCard>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <InputCard>
                <FormItem>
                  <FormLabel className="paragraph-regular text-dark500_light700">
                    Odaberite uslugu
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border px-5 py-2.5">
                        <SelectValue placeholder="Usluga" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="background-light900_dark200">
                      {services.map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                          <div className="flex items-center gap-5">
                            <div className="background-light800_dark300 flex-center rounded-full p-1">
                              <Image
                                src={item.icon}
                                height={27}
                                width={27}
                                alt={item.value}
                                className="invert-colors"
                              />
                            </div>
                            <p className="text-dark500_light700">
                              {item.label}
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              </InputCard>
            )}
          />
        </div>

        <div className="flex-center mt-8 flex-col gap-8 sm:flex-row">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <InputCard>
                <FormItem className="flex flex-col">
                  <FormLabel className="paragraph-regular text-dark500_light700 mt-2">
                    Odaberite datum
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="paragraph-regular text-dark500_light700">
                        <Button
                          className={cn(
                            "w-full paragraph-regular text-light400_light500 min-h-[48px] light-border border background-light800_dark300 px-5 py-2.5",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span className="paragraph-regular text-dark500_light700">
                              Pick a date
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < today || date >= threeMonthsFromToday
                        }
                        initialFocus
                        className="paragraph-regular text-dark500_light700 background-light900_dark200"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              </InputCard>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <InputCard>
                <FormItem>
                  <FormLabel className="paragraph-regular text-dark500_light700">
                    Odaberite vrijeme
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border px-5 py-2.5">
                        <SelectValue placeholder="Vrijeme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="background-light900_dark200 max-h-[10rem] overflow-y-auto">
                      {availableTimes.map((item) => (
                        <SelectItem value={item} key={item}>
                          <div className="flex items-center gap-5">
                            <p className="text-dark500_light700">{item}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              </InputCard>
            )}
          />
        </div>

        <div className="mt-8 flex w-full justify-start">
          <Button className="primary-gradient min-h-[40px] w-28 px-4 py-3 text-lg text-light-900 sm:w-32">
            Rezerviraj
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Reservation;
