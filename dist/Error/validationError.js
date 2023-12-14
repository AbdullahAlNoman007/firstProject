"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    const errorSource = [{
            path: err.errors.name.path,
            message: err.errors.name.message
        }];
    return {
        statusCode,
        errorSource
    };
};
exports.default = handleValidationError;
