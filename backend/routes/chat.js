import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { createMessage, deleteConversation, deleteMessage, getMessage, getUserConversation } from "../controllers/chat.js";

const router = express.Router();

router.post('/message', verifyUser, createMessage)
router.get('/conversation', verifyUser, getUserConversation)
router.get('/message/:id', verifyUser, getMessage)
router.delete('/message/:id', verifyUser, deleteMessage)
router.delete('/conversation/:id', verifyUser, deleteConversation)
export default router;
