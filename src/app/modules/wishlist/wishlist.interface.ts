import { Model, Types } from "mongoose";

export type IList = {
  email:string;
  status:string;
  book:Types.ObjectId
};

export type WishListModal = Model<IList, object>;
