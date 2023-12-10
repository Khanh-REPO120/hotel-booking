import express from "express";
import { editProfile, login, register } from "../controllers/auth.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.put("/:id", verifyUser, editProfile);

export default router