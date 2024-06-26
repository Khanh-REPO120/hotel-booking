import Hotel from "../models/Hotel.js";
import Order from "../models/Order.js";
import moment from "moment";
import User from "../models/User.js";
import { sendMail } from "./sendMail.js";
import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51PAAneDPZ1zrJ8YMTQYZ9gVYXiC8hSNxBBWKAUofMtWLuagfyxMhaRdzj1kgU5ujoSzo2olGuYKPjYBjfhD8jj5U00XGzIvstb"
);

export const createOrder = async (req, res, next) => {
  try {
    const new_book_data = [];
    let error = false;
    let error2 = false;
    for (let data of req.body.book_data) {
      let new_data = {};
      const checkHotel = await Hotel.findOne({ _id: data.hotel._id }).populate({
        path: "rooms",
        model: "Room",
        // select: ""
      });
      if (!checkHotel) {
        error = true;
        break;
      }
      new_data["price_hotel_rooms"] = data.rooms?.reduce((total, item) => (total += item.price), 0);
      new_data["hotel"] = data.hotel?._id;
      new_data["rooms"] = data.rooms?.map((item) => item._id);
      new_data["date"] = data?.date;
      const listOrder = await Order.find({
        "book_data.hotel": data?.hotel?._id,
        "book_data.rooms": data?.rooms?.map((e) => e._id),
        is_delete: false,
      });
      for (let orderObj of listOrder) {
        let currentDbTime = moment(moment(orderObj.book_data[0].date).format("YYYY-MM-DD")).valueOf();
        let currentTime = moment(moment(data?.date).format("YYYY-MM-DD")).valueOf();
        if (currentDbTime === currentTime) {
          error2 = true;
          break;
        }
      }
      if (!new_data.date || !new_data.price_hotel_rooms || !new_data.hotel || new_data.rooms?.length === 0) {
        error = true;
        break;
      }
      new_book_data.push(new_data);
    }
    if (error) {
      return res.status(400).send({ msg: "Some data hasnt values" });
    }
    if (error2) {
      return res.status(400).send({ msg: "Have people booking on date" });
    }
    const userDB = await User.findOne({ _id: req.user.id });

    const newOrder = new Order({
      book_data: new_book_data,
      total_price: new_book_data.reduce((total, item) => (total += item.price_hotel_rooms), 0),
      customer_info: req.body.customer?._id,
    });
    newOrder.save();
    sendMail(userDB.email, "booking", "https://booking.com");
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const { limit, page, is_delete, search } = req.query;
    const query = {};
    if (typeof is_delete === "boolean") {
      query.is_delete = is_delete;
    }
    if (search) {
      query.search = search;
    }
    query.customer_info = req.user.id;
    const orders = await Order.find()
      .limit(limit)
      .skip(page * limit)
      .populate({
        path: "book_data.hotel",
        model: "Hotel",
      })
      .populate({
        path: "book_data.rooms",
        model: "Room",
      })
      .populate({
        path: "customer_info",
        model: "User",
      })
      .sort({ createdAt: -1 });

    res.send(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { limit, page, is_delete, search } = req.query;
    const query = {};
    if (typeof is_delete === "boolean") {
      query.is_delete = is_delete;
    }
    if (search) {
      query.search = search;
    }

    const orders = await Order.find()
      .limit(limit)
      .skip(page * limit)
      .populate({
        path: "book_data.hotel",
        model: "Hotel",
      })
      .populate({
        path: "book_data.rooms",
        model: "Room",
      })
      .sort({ createdAt: -1 });

    res.send(orders);
  } catch (error) {
    next(error);
  }
};

export const getDetailOrder = async (req, res, next) => {
  try {
    const { order_id } = req.query;
    const orderDetail = await Order.findById(order_id)
      .populate({
        path: "book_data.hotel",
        model: "Hotel",
      })
      .populate({
        path: "book_data.rooms",
        model: "Room",
      })
      .populate({
        path: "customer_info",
        model: "User",
      });

    res.send(orderDetail);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, is_delete } = req.body;
    const update = {};

    const orderDetail = await Order.findById(id);

    if (!orderDetail) return res.status(400).send({ msg: "Order not existed" });

    if (orderDetail.is_delete === true) return res.status(400).send({ msg: "Order has deleted" });

    if (is_delete === true) {
      update.is_delete = true;
    }

    if (description) {
      update.description = description;
    }

    const updateOrder = await Order.findByIdAndUpdate(id, { $set: update }, { new: true, upsert: true });

    res.send(updateOrder);
  } catch (error) {
    next(error);
  }
};

export const payOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderDetail = await Order.findById(id)
      .populate({
        path: "book_data.hotel",
        model: "Hotel",
      })
      .populate({
        path: "book_data.rooms",
        model: "Room",
      })
      .populate({
        path: "customer_info",
        model: "User",
      });

    if (!orderDetail) return res.status(400).send({ msg: "Order not existed" });

    if (orderDetail.is_pay === true) return res.status(400).send({ msg: "Order has paid" });

    const session = await stripe.checkout.sessions.create({
      line_items: orderDetail?.book_data?.map((item) => {
        let object = {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.hotel.name || "",
            },
            unit_amount: item.price_hotel_rooms,
          },
          quantity: 1,
        };
        return object;
      }),
      mode: "payment",
      success_url: `http://localhost:3000/my-orders`,
      cancel_url: `http://localhost:3000/my-orders`,
    });

    res.send({ url: session.url });
  } catch (error) {
    next(error);
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const { limit, page, is_delete, search } = req.query;
    const query = {};
    if (typeof is_delete === "boolean") {
      query.is_delete = is_delete;
    }
    if (search) {
      query.search = search;
    }
    const orders = await Order.find()
      .limit(limit)
      .skip(page * limit)
      .populate({
        path: "book_data.hotel",
        model: "Hotel",
      })
      .populate({
        path: "book_data.rooms",
        model: "Room",
      })
      .populate({
        path: "customer_info",
        model: "User",
      })
      .sort({ createdAt: -1 });

    res.send(orders);
  } catch (error) {
    next(error);
  }
};

export const activeOrderSendMail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const orderDetail = await Order.findById(id);

    if (!orderDetail) return res.status(400).send({ msg: "Order not existed" });

    if (orderDetail.is_delete === true) return res.status(400).send({ msg: "Order has deleted" });
    if (orderDetail.is_active === true) return res.status(400).send({ msg: "Order has activated" });

    const handleActiveOrder = await Order.findByIdAndUpdate(id, { is_active: true }, { new: true, upsert: true });

    const userDB = await User.findOne({ _id: orderDetail.customer_info });
    sendMail(userDB.email, "booking", {});
    res.send({ message: "send mail order success", order: handleActiveOrder });
  } catch (error) {
    next(error);
  }
};

export const activePaySendMail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const orderDetail = await Order.findById(id);

    if (!orderDetail) return res.status(400).send({ msg: "Order not existed" });

    if (orderDetail.is_pay === true) return res.status(400).send({ msg: "Order has paid" });

    const handlePay = await Order.findByIdAndUpdate(id, { is_pay: true }, { new: true, upsert: true });

    const userDB = await User.findOne({ _id: orderDetail.customer_info });
    sendMail(userDB.email, "pay", { id });
    res.send({ message: "send mail order pay", order: handlePay });
  } catch (error) {
    next(error);
  }
};
