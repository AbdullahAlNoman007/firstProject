import { Tuser } from "./user.interface";
import { User } from "./user.model";

interface product {
    productName: string,
    price: number,
    quantity: number
}

const createUserIntoDB = async (userData: Tuser) => {

    if (await User.isUserExists(userData.userId)) {
        throw new Error('User already exists!')
    }
    const result = await User.create(userData)

    return result
}
const getUserFromDB = async () => {
    const result = await User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 })
    return result
}
const getAUserFromDB = async (id: number) => {
    if (!(await User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const result = await User.findOne({ userId: id }, { username: 1, fullName: 1, age: 1, email: 1, address: 1, userId: 1, isActive: 1, hobbies: 1, _id: 0, orders: 1 })
    return result
}
const UpdateAUserFromDB = async (id: number, userData: Tuser) => {

    if (!(await User.isUserExists(id))) {
        throw new Error("User doesn't exists!")
    }
    const result = await User.findOneAndUpdate({ userId: id }, userData, { new: true, upsert: true })
    return result

}
const deleteAUserFromDB = async (id: number) => {
    if (!(await User.isUserExists(id))) {
        throw new Error("User doesn't exists!")
    }
    const result = await User.deleteOne({ userId: id })
    return result
}
const addProductIntoDB = async (id: number, product: product) => {
    if (!(await User.isUserExists(id))) {
        throw new Error('User does not exist');
    }
    const result = await User.findOneAndUpdate(
        { userId: Number(id) },
        {
            $push: { orders: product }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return result

};
const getAllProductFromDB = async (id: number) => {
    if (!await User.isUserExists(id)) {
        throw new Error('User does not exist')
    }
    const result = await User.findOne({ userId: id }, { "orders.productName": 1, _id: 0, "orders.price": 1, "orders.quantity": 1 })
    return result
}
const getAllProductPriceFromDB = async (id: number) => {
    if (!await User.isUserExists(id)) {
        throw new Error('User does not exist')
    }
    const result = await User.findOne({ userId: id }, { _id: 0, "orders.price": 1, "orders.quantity": 1 })
    return result

}
export const userService = {
    createUserIntoDB,
    getUserFromDB,
    getAUserFromDB,
    UpdateAUserFromDB,
    deleteAUserFromDB,
    addProductIntoDB,
    getAllProductFromDB,
    getAllProductPriceFromDB
}