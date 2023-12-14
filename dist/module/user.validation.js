"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuserValidation = void 0;
const zod_1 = require("zod");
const TnameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const TaddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const TproductValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number()
});
const TuserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.number(),
        username: zod_1.z.string(),
        password: zod_1.z.string(),
        fullName: TnameValidationSchema,
        age: zod_1.z.number(),
        email: zod_1.z.string().email(),
        isActive: zod_1.z.boolean(),
        hobbies: zod_1.z.array(zod_1.z.string()),
        address: TaddressValidationSchema,
        orders: zod_1.z.array(TproductValidationSchema).optional()
    })
});
exports.TuserValidation = {
    TuserValidationSchema
};
