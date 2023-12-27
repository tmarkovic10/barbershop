"use server";

import Reservation from "@/database/reservation.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateReservationParams,
  DeleteReservationParams,
  GetReservationsParams,
  GetUserReservationsParams,
} from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { parse, isDate, startOfDay, endOfDay, format, addDays } from "date-fns";
import { today } from "../utils";

export async function createReservation(params: CreateReservationParams) {
  try {
    connectToDatabase();

    const { employee, service, date, time, author, path } = params;

    await Reservation.create({
      employee,
      service,
      date,
      time,
      author,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllReservations(params: GetReservationsParams) {
  try {
    connectToDatabase();

    const reservations = await Reservation.find({})
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });

    return { reservations };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllReservationsByDate(params: GetReservationsParams) {
  try {
    connectToDatabase();

    const {
      filter = format(today, "dd/MM/yyyy"),
      page = 1,
      pageSize = 9,
    } = params;

    const skipAmount = (page - 1) * pageSize;

    const filterDate = parse(filter, "dd/MM/yyyy", new Date());

    if (!isDate(filterDate)) {
      throw new Error("Invalid date format");
    }

    const filterDateStartOfDay = startOfDay(filterDate);

    console.log(
      "Filter Date Start of Day:",
      filterDateStartOfDay.toISOString()
    );

    // End of the next day (24 hours later)
    const filterDateEndOfNextDay = endOfDay(addDays(filterDate, 1));

    console.log(
      "Filter Date End of Next Day:",
      filterDateEndOfNextDay.toISOString()
    );

    const reservations = await Reservation.find({
      date: {
        $gte: filterDateStartOfDay,
        $lt: filterDateEndOfNextDay,
      },
    })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ date: 1 });

    const totalReservations = await Reservation.countDocuments({
      date: filterDateStartOfDay,
    });

    const isNext = totalReservations > skipAmount + reservations.length;

    return { reservations, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserReservations(params: GetUserReservationsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 9 } = params;

    // Calculate the number of reservations to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Reservation> = { author: userId };

    const reservations = await Reservation.find({ author: userId })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const totalReservations = await Reservation.countDocuments(query);

    const isNext = totalReservations > skipAmount + reservations.length;

    return { reservations, totalReservations, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteReservation(params: DeleteReservationParams) {
  try {
    connectToDatabase();

    const { reservationId, path } = params;

    await Reservation.deleteOne({ _id: reservationId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
