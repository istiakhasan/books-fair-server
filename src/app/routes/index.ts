import express from "express";
import bookRouter from "../modules/books/book.router";
const router = express.Router();

const allRoutes = [
  {
    path: "/books",
    route: bookRouter,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));


export default router;
