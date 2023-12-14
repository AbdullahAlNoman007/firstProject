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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 });
    return result;
});
const getAUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const result = yield user_model_1.User.findOne({ userId: id }, { username: 1, fullName: 1, age: 1, email: 1, address: 1, userId: 1, isActive: 1, hobbies: 1, _id: 0, orders: 1 });
    return result;
});
const UpdateAUserFromDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(id))) {
        throw new Error("User doesn't exists!");
    }
    const result = yield user_model_1.User.findOneAndUpdate({ userId: id }, userData, { new: true, upsert: true });
    return result;
});
const deleteAUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(id))) {
        throw new Error("User doesn't exists!");
    }
    const result = yield user_model_1.User.deleteOne({ userId: id });
    return result;
});
const addProductIntoDB = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ userId: Number(id) }, {
        $push: { orders: product }
    }, { new: true, upsert: true, setDefaultsOnInsert: true });
    return result;
});
const getAllProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const result = yield user_model_1.User.findOne({ userId: id }, { "orders.productName": 1, _id: 0, "orders.price": 1, "orders.quantity": 1 });
    return result;
});
const getAllProductPriceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const result = yield user_model_1.User.findOne({ userId: id }, { _id: 0, "orders.price": 1, "orders.quantity": 1 });
    return result;
});
exports.userService = {
    createUserIntoDB,
    getUserFromDB,
    getAUserFromDB,
    UpdateAUserFromDB,
    deleteAUserFromDB,
    addProductIntoDB,
    getAllProductFromDB,
    getAllProductPriceFromDB
};
