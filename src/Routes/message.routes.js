import { Router } from "express";
import { protect } from '../middleware/auth.middleware.js'
import { allMessages, sendMessage } from "../Controllers/message.controller.js";

const router = Router()

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);



export default router