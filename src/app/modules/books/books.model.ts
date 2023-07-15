import { Schema, model } from 'mongoose'
import { BooksModal, IBooks } from './book.interface'
const adminSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type:String,
      requied:true
    },
    genre: {
      type: String,
       required:true
    },
    publicationDate: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
export const Book = model<IBooks, BooksModal>('Admin', adminSchema)