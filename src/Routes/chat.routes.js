import { Router } from "express";
import { 
    accessChat,
    fetchChats,
    fetchGroups,
    createGroupChat,
    groupExit,
} from "../Controllers/chat.controller.js";
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/createGroup").post(protect, createGroupChat);
router.route("/fetchGroups").get(protect, fetchGroups);
router.route("/groupExit").put(protect, groupExit);

export default router