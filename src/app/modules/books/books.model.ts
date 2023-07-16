import { Schema, model } from "mongoose";
import { BooksModal, IBooks } from "./book.interface";
const bookSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      requied: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    review: {
      type: [String], // Array of strings
      default: [],    // Default value as an empty array
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Book = model<IBooks, BooksModal>("Books", bookSchema);
