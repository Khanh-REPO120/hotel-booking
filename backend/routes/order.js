import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createOrder, getOrders, activePaySendMail, payOrder, getDetailOrder, updateOrder, getAllOrder, activeOrderSendMail, getMyOrders } from "../controllers/order.js";

const router = express.Router();

router.post("/create-order", verifyUser, createOrder);
router.get("/get-my-orders", verifyUser, getMyOrders);
router.get("/get-detail-order", verifyUser, getDetailOrder);
router.put("/update-order/:id", verifyUser, updateOrder);
router.put("/pay-order/:id", verifyUser, payOrder);

router.get("/get-orders", verifyAdmin, getAllOrder);
router.put("/active-order/:id", verifyAdmin, activeOrderSendMail);
router.put("/active-pay/:id", verifyAdmin, activePaySendMail);

export default router;
