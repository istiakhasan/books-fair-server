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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const books_constant_1 = require("./books.constant");
const books_model_1 = require("./books.model");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.create(payload);
    return result;
});
const getAllBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, publicationDate } = filters, filtersData = __rest(filters, ["searchTerm", "publicationDate"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_constant_1.BookSearchAbleField.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (publicationDate) {
        andConditions.push({
            $expr: {
                $eq: [{ $substr: ["$publicationDate", 6, 4] }, publicationDate],
            },
        });
    }
    if (Object.keys(filtersData).length) {
        for (let key in filtersData) {
            if (filtersData[key] === "") {
                delete filtersData[key];
            }
        }
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield books_model_1.Book.find(whereConditions).sort({ createdAt: -1 });
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findById({ _id: id });
    return result;
});
const postReview = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.findByIdAndUpdate(id, { $push: { review: review } }, // Use $push to add the new review to the existing reviews array
    { new: true });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Book.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield books_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Book.deleteOne({ _id: id });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    postReview,
    updateBook,
    deleteBook
};
