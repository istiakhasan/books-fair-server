"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMthod = void 0;
const handleCastError = (error) => {
    const errors = [
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
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessages: errors,
    };
};
const handleZodError = (error) => {
    const statusCode = 400;
    const errors = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message
        };
    });
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors
    };
};
exports.handleErrorMthod = {
    handleCastError,
    handleValidationError,
    handleZodError
};
