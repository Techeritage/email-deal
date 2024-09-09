import { Schema, model, models } from "mongoose";

// Define the schema for emails
const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Email model, or use an existing one if it already exists
export const Email = models.Email || model("Email", emailSchema);
