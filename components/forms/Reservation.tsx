"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import InputCard from "../cards/InputCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn, threeMonthsFromToday, yesterday } from "@/lib/utils";
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
import { availableTimes, services, barbers } from "@/constants";
import { Button } from "../ui/button";
import { ReservationSchema } from "@/lib/validation";
import { createReservation } from "@/lib/actions/reservation.action";

interface Appointment {
  date: Date;
  time: string;
}

interface Props {
  mongoUserId: string;
  dateAndTime: Appointment[];
}

const Reservation: React.FC<Props> = ({ mongoUserId, dateAndTime }) => {
  const [availableTimesForDates, setavailableTimesForDates] =
    useState<string[]>();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof ReservationSchema>>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      employee: "",
      service: "",
      date: undefined,
      time: "",
    },
  });
  const { watch } = form;
  const dateValue = watch("date");

  useEffect(() => {
    if (dateValue) {
      const bookedTimeForDate = dateAndTime
        .filter(
          (appointment) =>
            format(appointment.date, "dd/MM/yyyy") ===
            format(dateValue, "dd/MM/yyyy")
        )
        .map((appointment) => appointment.time);

      const availableTimesForDate = availableTimes.filter(
        (time) => !bookedTimeForDate.includes(time)
      );
      setavailableTimesForDates(availableTimesForDate);
    }
  }, [dateValue, dateAndTime]);

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
                      {barbers.map((barber) => (
                        <SelectItem
                          value={barber.value}
                          className="text-dark500_light700 cursor-pointer hover:bg-light-800 dark:hover:bg-dark-300"
                          key={barber.value}
                        >
                          {barber.label}
                        </SelectItem>
                      ))}
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
                        <SelectItem
                          value={item.value}
                          key={item.value}
                          className="cursor-pointer hover:bg-light-800 dark:hover:bg-dark-300"
                        >
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
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
                            <span className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border py-2.5">
                              Odaberite datum
                            </span>
                          )}
                          <CalendarIcon className="text-light400_light500 ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date < yesterday || date >= threeMonthsFromToday
                        }
                        initialFocus
                        className="paragraph-regular text-dark500_light700 background-light900_dark200"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
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
                      {availableTimesForDates?.map((item) => (
                        <SelectItem
                          value={item}
                          key={item}
                          className="cursor-pointer hover:bg-light-800 dark:hover:bg-dark-300"
                        >
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
          <Button
            disabled={isSubmitting}
            className="primary-gradient min-h-[40px] w-28 px-4 py-3 text-lg text-light-900 sm:w-32"
          >
            {isSubmitting ? "Rezerviranje..." : "Rezervirajte"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Reservation;
