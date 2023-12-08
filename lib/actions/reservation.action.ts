"use server";

import Reservation from "@/database/reservation.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateReservationParams,
  GetReservationsParams,
  GetUserReservationsParams,
} from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

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
    // await Reservation.findByIdAndUpdate(reservation._id, {
    //   $push: { employee: { employee } },
    // });

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

export async function getUserReservations(params: GetUserReservationsParams) {
  try {
    connectToDatabase();

    const { userId, searchQuery, page = 1, pageSize = 9 } = params;

    // Calculate the number of reservations to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Reservation> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

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

    return { reservations, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
