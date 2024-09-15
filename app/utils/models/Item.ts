import { Schema, model, models } from "mongoose";

// Define the schema for a product or item
const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Item model, or use an existing one if it already exists
export const Item = models.Item || model("Item", itemSchema);
