import express from 'express'
import validationRequest from '../middleware/validationRequest';
import { userControllers } from './user.controller';
import { TuserValidation } from './user.validation';

const router = express.Router()

router.post('/', validationRequest(TuserValidation.TuserValidationSchema), userControllers.createUser)
router.get('/', userControllers.getAlluser)
router.get('/:userId', userControllers.getAUser)
router.put('/:userId', validationRequest(TuserValidation.TuserValidationSchema), userControllers.UpdateAUser)
router.delete('/:userId', userControllers.deleteAUser)
router.put('/:userId/orders', userControllers.addProduct)
router.get('/:userId/orders', userControllers.getAllProduct)
router.get('/:userId/orders/total-price', userControllers.getAllProductPrice)


export const userRouter = router;