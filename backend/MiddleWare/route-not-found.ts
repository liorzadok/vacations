import { Request,Response,NextFunction} from "express";

//import the model:
import {RouteNotFoundError} from "../Models/Client-Errors"

//middleware function:
const ErrorHandler = (request:Request,response:Response,next:NextFunction)=>{
    const error = new RouteNotFoundError(request.originalUrl)
    next(error)
}

export default ErrorHandler;