"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistService = void 0;
const wishList_model_1 = require("./wishList.model");
const addToWishList = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.updateOne({ email: data.email, book: data.book }, {
        $set: data,
    }, {
        upsert: true,
    });
    return result;
});
const updateToWishList = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.create(data);
    return result;
});
const getToWishList = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.find({
        email: data.email,
        status: data.status,
    }).populate("book");
    return result;
});
exports.wishlistService = {
    addToWishList,
    updateToWishList,
    getToWishList,
};
