/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../Error/zodError";
import handleValidationError from "../Error/validationError";
import handleCastError from "../Error/CastError";
import handleDuplicateError from "../Error/duplicateError";
import AppError from "../Error/AppError";

export type TerrorSource = {
    path: string | number;
    message: string
}[]

export type TgenaratedRespone = {
    success: boolean;
    message: string;
    errorSource: TerrorSource
}

const globalErrorHandle: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let Message = err.message || "Something Went wrong"
    let errorSource: TerrorSource = [{
        path: '',
        message: 'Something Went wrong'
    }]

    if (err instanceof ZodError) {
        const simpleError = handleZodError(err);
        statusCode = simpleError.statusCode;
        errorSource = simpleError.errorSource;
        Message = 'It is a Zod validation Error'
    }
    else if (err.name === 'ValidationError') {
        const simpleError = handleValidationError(err);
        statusCode = simpleError.statusCode;
        errorSource = simpleError.errorSource;
        Message = 'It is a Schema validation Error'
    }
    else if (err.name === 'CastError') {
        const simpleError = handleCastError(err);
        statusCode = simpleError.statusCode;
        errorSource = simpleError.errorSource;
        Message = 'It is a Cast Error'
    }
    else if (err.code === 11000) {
        const simpleError = handleDuplicateError(err);
        statusCode = simpleError.statusCode;
        errorSource = simpleError.errorSource;
        Message = 'It is a duplicate Error'
    }
    else if (err instanceof AppError) {
        statusCode = err?.statuCode;
        Message = err?.message;
        errorSource = [
            {
                path: '',
                message: err?.message
            }
        ]
    }
    else if (err instanceof Error) {
        Message = err?.message;
        errorSource = [
            {
                path: '',
                message: err?.message
            }
        ]
    }

    return res.status(statusCode).json({
        success: false,
        message: Message,
        errorSource
    })
}
export default globalErrorHandle