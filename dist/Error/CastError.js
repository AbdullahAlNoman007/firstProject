"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const errorSource = [{
            path: err.path,
            message: err.message
        }];
    return {
        statusCode,
        errorSource
    };
};
exports.default = handleCastError;
