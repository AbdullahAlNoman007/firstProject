"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const errorMessage = match && match[1];
    const errorSource = [{
            path: '',
            message: `${errorMessage} already exists` || " "
        }];
    return {
        statusCode,
        errorSource
    };
};
exports.default = handleDuplicateError;
