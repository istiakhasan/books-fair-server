import { Schema, model } from "mongoose";
import { IList, WishListModal } from "./wishlist.interface";

const wishListSchema = new Schema<IList>(
  {
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
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
export const WishList = model<IList, WishListModal>("WishList", wishListSchema);
