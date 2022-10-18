import express from "express";
import {
  countByCity,
  countByType,
  getHotelRooms,
  getHotels,
  getHotel
} from "../controllers/hotel.js";
const router = express.Router();

router.get("/hotels", getHotels);
router.get("/hotels/countByCity", countByCity);
router.get("/hotels/countByType", countByType);
router.get("/hotels/room/:id", getHotelRooms);
router.get("/hotels/find/:id", getHotel);

export default router;
