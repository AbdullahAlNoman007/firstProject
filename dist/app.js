"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const globalErrorHandle_1 = __importDefault(require("./middleware/globalErrorHandle"));
const user_router_1 = require("./module/user.router");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/users', user_router_1.userRouter);
app.get('/', (req, res) => {
    res.send("Hello Assignment 2");
});
app.use(notFound_1.default);
app.use(globalErrorHandle_1.default);
exports.default = app;
