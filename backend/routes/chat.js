import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { searchUser, createMessage, deleteConversation, deleteMessage, getMessage, getUserConversation } from "../controllers/chat.js";

const router = express.Router();

router.post('/message', verifyUser, createMessage)
router.get('/conversation', verifyUser, getUserConversation)
router.get('/message/:id', verifyUser, getMessage)
router.delete('/message/:id', verifyUser, deleteMessage)
router.delete('/conversation/:id', verifyUser, deleteConversation)
router.get('/search_user', verifyUser, searchUser)
export default router;
