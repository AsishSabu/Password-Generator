import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";


const errorHandlingMidleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err.message,"//////////");
  
  if (err.statusCode === 404) {
    res
      .status(err.statusCode)
      .json({ errors: err.status, errorMessage: err.message });  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};

export default errorHandlingMidleware;