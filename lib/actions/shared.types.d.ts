import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetReservationsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
}

export interface CreateReservationParams {
  employee: string;
  service: string;
  date: Date;
  time: string;
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetUserReservationsParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
