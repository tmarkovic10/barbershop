"use server";

import Reservation from "@/database/reservation.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { CreateReservationParams, GetReservationsParams } from "./shared.types";
import User from "@/database/user.model";

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

export async function getUserReservations(params: GetReservationsParams) {
  // I will here get All Reservations
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
