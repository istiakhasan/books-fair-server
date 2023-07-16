"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishList = void 0;
const mongoose_1 = require("mongoose");
const wishListSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Books",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.WishList = (0, mongoose_1.model)("WishList", wishListSchema);
