import { WishList } from "./wishList.model";
import { IList } from "./wishlist.interface";

const addToWishList = async (data: IList) => {
  const result = await WishList.updateOne(
    { email: data.email,book:data.book },
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
export const wishlistService = {
  addToWishList,
  updateToWishList,
};
