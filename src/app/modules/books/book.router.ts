import express from 'express'
import { booksController } from './books.controller'
const bookRouter=express.Router()

bookRouter.post('/',booksController.createBook)
bookRouter.get('/',booksController.getAllBooks)
bookRouter.get('/:id',booksController.getSingleBook)
bookRouter.patch('/:id',booksController.updateBook)
bookRouter.delete('/:id',booksController.deleteBook)
bookRouter.patch('/review/:id',booksController.postReview)

export default bookRouter