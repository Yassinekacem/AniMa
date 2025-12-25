import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    birthDate: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Nouveau champ
  },
  { timestamps: true }
);


export const User = models.User || model("User", UserSchema);
