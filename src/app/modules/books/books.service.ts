import { IBooks } from "./book.interface";
import { BookSearchAbleField } from "./books.constant";
import { Book } from "./books.model";
type IBooksFiler = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};
const createBook = async (payload: IBooks): Promise<IBooks> => {
  const result = await Book.create(payload);
  return result;
};
const getAllBooks = async (filters: IBooksFiler): Promise<IBooks[]> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  console.log(filters);
  if (searchTerm) {
    andConditions.push({
      $or: BookSearchAbleField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    for (let key in filtersData) {
      if (filtersData[key as keyof typeof filtersData] === "") {
        delete filtersData[key as keyof typeof filtersData];
      }
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
};
