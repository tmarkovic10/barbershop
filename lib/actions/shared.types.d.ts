import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetReservationsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
}

export interface GetUserReservationsParams {}

export interface CreateReservationParams {
  employee: string;
  service: string;
  date: Date;
  time: string;
  author: Schema.Types.ObjectId | IUser;
  path: string;
}
