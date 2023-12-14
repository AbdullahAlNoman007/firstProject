import sendRespone from "../utility/sendResponse";
import catchAsync from "../utility/trycatch";
import { Tproduct, Tuser } from "./user.interface";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const payload: Tuser = req.body
    const result = await userService.createUserIntoDB(payload)
    if (!Object.keys(result).length) {
        throw new Error('Failed to create users')
    }
    const { password, ...remaining } = payload
    sendRespone(res, {
        success: true,
        statusCode: 201,
        message: "User created successfully!",
        data: remaining
    })
})

const getAlluser = catchAsync(async (req, res) => {
    const result = await userService.getUserFromDB()
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "Users fetched successfully!",
        data: result
    })
})

const getAUser = catchAsync(async (req, res) => {
    const { userId } = req.params
    const result = await userService.getAUserFromDB(Number(userId))
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "User fetched successfully!",
        data: result
    })
})
const UpdateAUser = catchAsync(async (req, res) => {
    const { userId } = req.params
    const payload: Tuser = req.body
    const result = await userService.UpdateAUserFromDB(Number(userId), payload)
    if (!Object.keys(result).length) {
        throw new Error('Failed to create users')
    }
    const { password, ...remaining } = payload
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "User updated successfully!",
        data: remaining
    })
})

const deleteAUser = catchAsync(async (req, res) => {
    const { userId } = req.params
    const result = await userService.deleteAUserFromDB(Number(userId))
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully!",
        data: result
    })
})

const addProduct = catchAsync(async (req, res) => {
    const { userId } = req.params
    const payload = req.body
    const result = await userService.addProductIntoDB(Number(userId), payload)
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "Order created successfully!",
        data: result
    })
})

const getAllProduct = catchAsync(async (req, res) => {
    const { userId } = req.params
    const result = await userService.getAllProductFromDB(Number(userId))
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "Orders fetched successfully!",
        data: result
    })
})

const getAllProductPrice = catchAsync(async (req, res) => {
    const { userId } = req.params
    let price: number = 0
    const result = await userService.getAllProductPriceFromDB(Number(userId))
    const orders = result?.orders as Tproduct[]

    for (const order of orders) {
        price = price + (order.price * order.quantity)
    }
    sendRespone(res, {
        success: true,
        statusCode: 200,
        message: "Orders fetched successfully!",
        data: {
            totalPrice: price
        }
    })
})

export const userControllers = {
    createUser,
    getAlluser,
    getAUser,
    UpdateAUser,
    deleteAUser,
    addProduct,
    getAllProduct,
    getAllProductPrice
}
