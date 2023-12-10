import React, { useEffect, useState } from 'react'
import "./order.css";
import Navbar from "../../components/web/navbar/Navbar";
import Header from "../../components/web/header/Header";
import MailList from "../../components/web/mailList/MailList";
import Footer from "../../components/web/footer/Footer";
import axios from 'axios';
const Order = () => {
    const [orders, setOrders] = useState([])

    const getMyOrder = async () => {
        try {
            const res = await axios.get("orders/get-my-orders")
            if(res.status === 200) {
                setOrders(res.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateMyOrder = async (id) => {
        try {
            const res = await axios.put(`orders/update-order/${id}`, {description: Object(orders?.find(item => item._id === id))?.description})
            if (res.status === 200) {
                window.alert("Update note success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelOrder = async (id) => {
        try {
            if (window.confirm(`Cancel Order?`) == false) {
                return
            } 
            const res = await axios.put(`orders/update-order/${id}`, {is_delete: true})
            if (res.status === 200) {
                window.alert("Cancel order success")
                await getMyOrder()
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getMyOrder()
    },[])
  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 30, marginLeft: 30, marginRight: 30}}>
           {orders?.map((item, index) => {
                const book_data = item.book_data[0]
                return (
                    <div className="itemOrder" style={{display: 'flex', flexDirection: 'row', gap: 20, flexWrap: 'wrap'}} key={index}>
                        <div>
                            <div>
                                <img
                                    style={{ width: "110px" }}
                                    alt=""
                                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1"
                                />
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1, minWidth: "150px"}}>
                            <span>Khách sạn: {book_data?.hotel?.title}</span>
                            <span>Tp: {book_data?.hotel?.city}</span>
                            <span>Mô tả: {book_data?.hotel?.desc}</span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1, minWidth: "150px"}}>
                            <span>Loại phòng: {book_data?.rooms[0]?.title}</span>
                            <span>Số người: {book_data?.rooms[0]?.maxPeople}</span>
                            <span>Giá: {book_data?.rooms[0]?.price}</span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1, minWidth: "150px"}}>
                            <span>Tổng tiền: {item.total_price}</span>
                            <span style={{color: item.is_active === true ? "blue" : (item.is_delete === true ? "red" : "gray"), fontWeight: 'bold'}}>{item.is_active === true ? "Đã xuất đơn" : (item.is_delete === true ? "Đơn đã bị huỷ" : "Đơn đang đợi duyệt")}</span>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1, minWidth: "150px"}}>
                            <span>Ghi chú: {item.description}</span>
                            <input value={item.description} onChange={(e) => {
                                orders[index].description = e.target.value
                            }}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: "150px"}}>
                            <button onClick={() => updateMyOrder(item._id)}>Chỉnh sửa ghi chú</button>
                            {item.is_active === false && item.is_delete === false && <button onClick={() => cancelOrder(item._id)}>Huỷ đơn</button>}
                        </div>
                    </div>
                )
           }
           )}
        </div>
        <MailList />
        <Footer />
    </div>
  )
}

export default Order