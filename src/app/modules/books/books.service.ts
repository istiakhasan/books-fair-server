import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
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
  const { searchTerm, publicationDate, ...filtersData } = filters;
  const andConditions = [];
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

  if (publicationDate) {
    andConditions.push({
      $expr: {
        $eq: [{ $substr: ["$publicationDate", 6, 4] }, publicationDate],
      },
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
  const result = await Book.find(whereConditions).sort({createdAt:-1});
  return result;
};
const getSingleBook = async (id: string): Promise<IBooks | null> => {
  const result = await Book.findById({ _id: id });
  return result;
};
const postReview = async (
  id: string,
  review: string
): Promise<IBooks | null | undefined> => {
  const result = await Book.findByIdAndUpdate(
    id,
    { $push: { review: review } }, // Use $push to add the new review to the existing reviews array
    { new: true }
  );
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBooks>
): Promise<IBooks | null> => {
  const isExist = await Book.findOne({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  console.log(payload);
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBook=async(id:string)=>{
 const result=await Book.deleteOne({_id:id})
 return result
}
export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  postReview,
  updateBook,
  deleteBook
};
