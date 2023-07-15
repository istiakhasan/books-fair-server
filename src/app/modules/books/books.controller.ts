import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { BookService } from "./books.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...academisSemerterData } = req.body;
  const result = await BookService.createBook(
    academisSemerterData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Retrived   successfully",
    data: result,
  });
});

export const booksController = {
  createBook,
  getAllBooks
};