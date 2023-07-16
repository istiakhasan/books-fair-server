"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const wishListRouter = express_1.default.Router();
wishListRouter.put('/', wishlist_controller_1.wishListController.addToWishList);
wishListRouter.get('/', wishlist_controller_1.wishListController.getToWishList);
// wishListRouter.patch('/:id',wishListController.updateToWishList)
exports.default = wishListRouter;
