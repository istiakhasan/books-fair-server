import { IBooks } from "./book.interface";
import { Book } from "./books.model";

const createBook = async (payload: IBooks): Promise<IBooks> => {
  const result = await Book.create(payload);
  return result;
};
const getAllBooks = async (): Promise<IBooks[]> => {
  const result = await Book.find();
  return result;
};

export const BookService = {
  createBook,
  getAllBooks
};
