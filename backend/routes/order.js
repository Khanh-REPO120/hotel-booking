import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { createOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/create-order", verifyUser, createOrder);

export default router;
