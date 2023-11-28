import Hotel from "../models/Hotel.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const new_book_data = []
    let error = false
    for (let data of req.body.book_data) {
        let new_data = {}
        const checkHotel = await Hotel.findOne({_id: data.hotel._id}).populate({
            path: "rooms",
            model: "Room",
            // select: ""
        })
        if (!checkHotel) {
            error = true;
            break;
        } 
        new_data['price_hotel_rooms'] = data.rooms?.reduce((total, item) => total += item.price, 0);
        new_data['hotel'] = data.hotel?._id;
        new_data['rooms'] = data.rooms?.map(item => item._id);
        new_data['date'] = data?.date;
        if(!new_data.date || !new_data.price_hotel_rooms || !new_data.hotel || new_data.rooms?.length === 0) {
            error = true;
            break;
        }
        new_book_data.push(new_data)
    }
    if(error) {
        return res.status(400).send({msg: 'Some data hasnt values'})
    }
    const newOrder = new Order({
        book_data: new_book_data,
        total_price: new_book_data.reduce((total, item) => total += item.price_hotel_rooms),
        customer_info: req.body.customer?._id
    })
    newOrder.save();
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
};
