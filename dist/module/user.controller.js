"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const sendResponse_1 = __importDefault(require("../utility/sendResponse"));
const trycatch_1 = __importDefault(require("../utility/trycatch"));
const user_service_1 = require("./user.service");
const createUser = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.userService.createUserIntoDB(payload);
    if (!Object.keys(result).length) {
        throw new Error('Failed to create users');
    }
    const { password } = payload, remaining = __rest(payload, ["password"]);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User created successfully!",
        data: remaining
    });
}));
const getAlluser = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUserFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Users fetched successfully!",
        data: result
    });
}));
const getAUser = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.userService.getAUserFromDB(Number(userId));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User fetched successfully!",
        data: result
    });
}));
const UpdateAUser = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const payload = req.body;
    const result = yield user_service_1.userService.UpdateAUserFromDB(Number(userId), payload);
    if (!Object.keys(result).length) {
        throw new Error('Failed to create users');
    }
    const { password } = payload, remaining = __rest(payload, ["password"]);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User updated successfully!",
        data: remaining
    });
}));
const deleteAUser = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.userService.deleteAUserFromDB(Number(userId));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully!",
        data: result
    });
}));
const addProduct = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const payload = req.body;
    const result = yield user_service_1.userService.addProductIntoDB(Number(userId), payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Order created successfully!",
        data: result
    });
}));
const getAllProduct = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.userService.getAllProductFromDB(Number(userId));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Orders fetched successfully!",
        data: result
    });
}));
const getAllProductPrice = (0, trycatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    let price = 0;
    const result = yield user_service_1.userService.getAllProductPriceFromDB(Number(userId));
    const orders = result === null || result === void 0 ? void 0 : result.orders;
    for (const order of orders) {
        price = price + (order.price * order.quantity);
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Orders fetched successfully!",
        data: {
            totalPrice: price
        }
    });
}));
exports.userControllers = {
    createUser,
    getAlluser,
    getAUser,
    UpdateAUser,
    deleteAUser,
    addProduct,
    getAllProduct,
    getAllProductPrice
};
