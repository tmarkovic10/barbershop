"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, cn } from "@/lib/utils";
import InputCard from "../cards/InputCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { barbers } from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import format from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedBarber, setSelectedBarber] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value1: string, value2: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key1: "employee",
      value1,
      key2: "date",
      value2,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="flex-center flex-col gap-8 sm:flex-row">
        <InputCard>
          <Select
            onValueChange={(value1) => {
              setSelectedBarber(value1);
              handleUpdateParams(
                value1,
                selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
              );
            }}
            defaultValue={paramFilter || undefined}
          >
            <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 min-h-[48px] border px-5 py-2.5">
              <SelectValue placeholder="Zaposlenik" />
            </SelectTrigger>
            <SelectContent className="background-light900_dark200">
              <SelectGroup>
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
                  handleUpdateParams(
                    selectedBarber,
                    format(date!, "dd/MM/yyyy")
                  );
                  setCalendarOpen(false);
                }}
                initialFocus
                className="paragraph-regular text-dark500_light700 background-light900_dark200"
              />
            </PopoverContent>
          </Popover>
        </InputCard>
      </div>
    </>
  );
};

export default Filter;
