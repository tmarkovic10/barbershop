import { Schema, models, model, Document } from "mongoose";

export interface IReservation extends Document {
  employee: string;
  service: string;
  date: Date;
  time: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const ReservationSchema = new Schema({
  employee: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);

export default Reservation;
