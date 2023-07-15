import { Model, Types } from "mongoose";

export type IBooks = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  review?: string;
  email: string;
  description: string;
  image: string;
};

export type BooksModal = Model<IBooks, object>;
