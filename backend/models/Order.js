import mongoose from "mongoose";
import Schema from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    book_data: [
      {
        hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
        rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
        price_hotel_rooms: Number,
        date: Date
      },
    ],
    total_price: Number,
    customer_info: { type: Schema.Types.ObjectId, ref: "User" },
    description: String,
    is_active: { type: Boolean, default: false},
    is_delete: { type: Boolean, default: false},
    is_pay: { type: Boolean, default: false},
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
