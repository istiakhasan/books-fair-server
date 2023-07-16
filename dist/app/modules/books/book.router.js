"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const bookRouter = express_1.default.Router();
bookRouter.post('/', books_controller_1.booksController.createBook);
bookRouter.get('/', books_controller_1.booksController.getAllBooks);
bookRouter.get('/:id', books_controller_1.booksController.getSingleBook);
bookRouter.patch('/:id', books_controller_1.booksController.updateBook);
bookRouter.delete('/:id', books_controller_1.booksController.deleteBook);
bookRouter.patch('/review/:id', books_controller_1.booksController.postReview);
exports.default = bookRouter;
