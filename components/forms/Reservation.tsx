"use client";

import React from "react";
import Image from "next/image";
import InputCard from "../cards/InputCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/constants";
import { getDatesInRange } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const Reservation = () => {
  const today = new Date();
  const dateRange = getDatesInRange(today);
  const active = "02/11";

  return (
    <>
      <div className="flex-center flex-col gap-8 sm:flex-row">
        <InputCard>
          <p className="paragraph-regular text-dark500_light700">
            Select an employee
          </p>
          <Select>
            <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 border px-5 py-2.5">
              <SelectValue placeholder="Zaposlenik" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light" className="text-dark500_light700">
                Light
              </SelectItem>
              <SelectItem value="light" className="text-dark500_light700">
                Dark
              </SelectItem>
              <SelectItem value="light" className="text-dark500_light700">
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </InputCard>

        <InputCard>
          <p className="paragraph-regular text-dark500_light700">
            Select a service
          </p>
          <Select>
            <SelectTrigger className="body-regular light-border background-light800_dark300 text-light400_light500 border px-5 py-2.5">
              <SelectValue placeholder="Usluga" />
            </SelectTrigger>
            <SelectContent className="mt-1">
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
                    <p className="text-dark500_light700">{item.label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputCard>
      </div>

      <div className="flex-center shadow-light100_darknone background-light900_dark200 light-border mt-8 w-full flex-col overflow-x-auto rounded-lg border p-4">
        <p className="paragraph-regular text-dark500_light700">
          Odaberite datum
        </p>
        <ScrollArea className="flex-center w-full whitespace-nowrap pt-6">
          <div className="flex-center gap-6">
            {dateRange.map((item) => (
              <Button
                key={item}
                onClick={() => {}}
                className={`body-medium rounded-lg px-6 py-3 shadow-none ${
                  active === item
                    ? "bg-primary-100 text-primary-500"
                    : "bg-light-800 text-light-500"
                }`}
              >
                {item}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default Reservation;
