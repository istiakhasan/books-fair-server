import express from 'express'
import { wishListController } from './wishlist.controller'
const wishListRouter=express.Router()

wishListRouter.put('/',wishListController.addToWishList)
wishListRouter.get('/',wishListController.getToWishList)
// wishListRouter.patch('/:id',wishListController.updateToWishList)


export default wishListRouter