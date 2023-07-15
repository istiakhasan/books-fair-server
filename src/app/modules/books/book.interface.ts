import { Model, Types } from 'mongoose'


export type IBooks = {
 title:string;
 author:string;
 genre:string;
 publicationDate:string;
 review?:string;
}

export type BooksModal = Model<IBooks, object>