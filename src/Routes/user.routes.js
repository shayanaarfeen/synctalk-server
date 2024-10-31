import { Router } from "express";
import {
    loginController,
    registerController,
    fetchAllUsersController,
} from '../Controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

router.route("/login").post(loginController)
router.route("/register").post(registerController)
router.route("/fetchUsers").get(protect, fetchAllUsersController)


export default router