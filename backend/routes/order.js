import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createOrder, getOrders, getDetailOrder, updateOrder, getAllOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/create-order", verifyUser, createOrder);
router.get("/get-my-orders", verifyUser, getOrders);
router.get("/get-orders", verifyAdmin, getAllOrder);
router.get("/get-detail-order", verifyUser, getDetailOrder);
router.put("/update-order/:id", verifyUser, updateOrder);

export default router;
