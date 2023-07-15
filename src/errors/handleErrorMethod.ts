import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interface/error";
import {ZodError,ZodIssue} from 'zod'
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

const handleCastError = (error: mongoose.CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Something went wrong",
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Cast error",
    errorMessages: errors,
  };
};

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

const handleZodError=(error:ZodError)=>{
  const statusCode=400 
  const errors:IGenericErrorMessage[]=error.issues.map((issue:ZodIssue)=>{
     return {
      path:issue?.path[issue.path.length-1],
      message:issue.message
     }
  })


  return {
    statusCode,
    message:'Validation Error',
    errorMessages:errors
  }

}



export const handleErrorMthod = {
  handleCastError,
  handleValidationError,
  handleZodError
};
