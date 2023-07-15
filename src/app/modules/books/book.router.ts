import express from 'express'
import { booksController } from './books.controller'
const bookRouter=express.Router()

bookRouter.post('/',booksController.createBook)
bookRouter.get('/',booksController.getAllBooks)

export default bookRouter