"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { barbers } from "@/constants";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import InputCard from "../cards/InputCard";

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

interface Props {
  reservations: Reservations[];
}

const AdminForm = ({ reservations }: Props) => {
  const [selectedBarber, setSelectedBarber] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const handleSelectedBarberChange = (value: string) => {
    setSelectedBarber(value);
  };

  console.log(selectedBarber);
  console.log(reservations);

  return (
    <>
      <div className="flex-center flex-col gap-8 sm:flex-row">
        <InputCard>
          <Select onValueChange={handleSelectedBarberChange}>
            <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border px-5 py-2.5">
              <SelectValue placeholder="Zaposlenik" />
            </SelectTrigger>
            <SelectContent className="background-light900_dark200">
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {barbers.map((barber) => (
                  <SelectItem
                    key={barber.value}
                    value={barber.value}
                    className="text-dark500_light700 cursor-pointer hover:bg-light-800 dark:hover:bg-dark-300"
                  >
                    {barber.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </InputCard>

        <InputCard>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full paragraph-regular text-light400_light500 min-h-[48px] light-border border background-light800_dark300 px-5 py-2.5",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                {selectedDate ? (
                  format(selectedDate, "dd/MM/yyyy")
                ) : (
                  <span className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border py-2.5">
                    Odaberite datum
                  </span>
                )}
                <CalendarIcon className="text-light400_light500 ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setCalendarOpen(false);
                }}
                initialFocus
                className="paragraph-regular text-dark500_light700 background-light900_dark200"
              />
            </PopoverContent>
          </Popover>
        </InputCard>
      </div>

      <div className="mt-9">
        <h1 className="h1-bold text-dark100_light900 text-center">
          Rezervacije
        </h1>
      </div>
    </>
  );
};

export default AdminForm;
