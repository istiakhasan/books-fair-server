import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { wishlistService } from "./wishlist.service";



const addToWishList = catchAsync(async (req: Request, res: Response) => {
  
  const result = await wishlistService.addToWishList(req.body.data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Add to wish list successfully",
    data: result,
  });
});
const updateToWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistService.updateToWishList(req.body.data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Add to wish list successfully",
    data: result,
  });
});
const getToWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await wishlistService.getToWishList(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Add to wish list successfully",
    data: result,
  });
});


export const wishListController = {
  addToWishList,
  updateToWishList,
  getToWishList
};
