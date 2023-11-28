import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { cleanObj } from "../utils/helpers.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  let { min, max, ...others } = req.query;

  others = cleanObj(others);

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const KsCount = await Hotel.countDocuments({ type: "khach_san" });
    const NnCount = await Hotel.countDocuments({ type: "nha_nghi" });
    const ChCount = await Hotel.countDocuments({ type: "can_ho" });
    const RsCount = await Hotel.countDocuments({ type: "resort" });
    const BtCount = await Hotel.countDocuments({ type: "biet_thu" });

    res.status(200).json([
      { type: "khach_san", count: KsCount },
      { type: "nha_nghi", count: NnCount },
      { type: "can_ho", count: ChCount },
      { type: "resort", count: RsCount },
      { type: "biet_thu", count: BtCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate({
      path: "rooms",
      model: "Room",
      // select: ""
    });
    res.status(200).json(hotel?.rooms || [])
  } catch (err) {
    next(err);
  }
};
