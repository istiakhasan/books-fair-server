import { WishList } from "./wishList.model";
import { IList } from "./wishlist.interface";

const addToWishList = async (data: IList) => {
  const result = await WishList.updateOne(
    { email: data.email, book: data.book },
    {
      $set: data,
    },
    {
      upsert: true,
    }
  );
  return result;
};
const updateToWishList = async (data: IList) => {
  const result = await WishList.create(data);
  return result;
};
const getToWishList = async (data: IList) => {
  const result = await WishList.find({
    email: data.email,
    status: data.status,
  }).populate("book");
  return result;
};
export const wishlistService = {
  addToWishList,
  updateToWishList,
  getToWishList,
};
