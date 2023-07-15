import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

import config from '../../config'
import { Secret } from 'jsonwebtoken'
import { jwtHeplers } from '../helpers/jwtHelpers'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      let verifyedUser = null

      verifyedUser = jwtHeplers.verifyToken(token, config.jwt.secret as Secret)

      req.user = verifyedUser

      if (requiredRoles.length && !requiredRoles.includes(verifyedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden ')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
