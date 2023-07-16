"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_router_1 = __importDefault(require("../modules/books/book.router"));
const wishlist_router_1 = __importDefault(require("../modules/wishlist/wishlist.router"));
const router = express_1.default.Router();
const allRoutes = [
    {
        path: "/books",
        route: book_router_1.default,
    },
    {
        path: "/wishlist",
        route: wishlist_router_1.default,
    },
];
allRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
