import express from "express";
import bookRouter from "../modules/books/book.router";
import wishListRouter from "../modules/wishlist/wishlist.router";
const router = express.Router();

const allRoutes = [
  {
    path: "/books",
    route: bookRouter,
  },
  {
    path: "/wishlist",
    route: wishListRouter,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));


export default router;
