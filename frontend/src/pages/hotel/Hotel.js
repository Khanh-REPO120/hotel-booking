import "./hotel.css";
import Navbar from "../../components/web/navbar/Navbar";
import Header from "../../components/web/header/Header";
import MailList from "../../components/web/mailList/MailList";
import Footer from "../../components/web/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/web/reserve/Reserve";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/v1/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);
  const [dateApply, setDateApply] = useState(new Date());
  const [roomChoose, setRoomChoose] = useState({});

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days = 1;

  if (dates.length) {
    days = dayDifference(dates[0].endDate, dates[0].startDate);
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClickRoom = (val) => {
    setRoomChoose(val);
  };

  const handleOrder = async () => {
    try {
      if (window.confirm(`Checkout order confirm?`) == false) {
        return
      }
      const body = {
        book_data: [{
          hotel: data,
          rooms: [roomChoose],
          date: dateApply
        }],
        customer: user,
      };
      if (Object.keys(roomChoose).length === 0) {
        return window.alert("fail please choose room")
      }
      const res = await axios.post("/orders/create-order", body)
      if (res.status === 200) {
        navigate("/")
      }

    } catch (error) {
      window.alert(`fail: ${error.response.data.msg}`);
      console.log(error)
    }
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer homeContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img
                  src={
                    data.photos[slideNumber] ||
                    "https://t-cf.bstatic.com/static/img/theme-index/bg_resorts_new/6e8294d75f648eab2cd2818f0a40854367e584a5.jpg"
                  }
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={() => handleOrder()} className="bookNow">
              Đặt trước hoặc đặt ngay!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <h1 className="hotelTitle">Khách sạn {data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span style={{ fontSize: "15px" }}>Thành phố: {data.city}</span>
            <span className="hotelDistance">Cách trung tâm thanh phố: {data.distance}m</span>
            <span className="hotelPriceHighlight">Giá chỉ từ ${data.cheapestPrice}</span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img style={{ maxWidth: '400px', }} onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">Mô tả: {data.desc}</p>
              </div>
            </div>
            <div>
              <h2>Rooms:</h2>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {data?.rooms?.map((val, index) => (
                  <div
                    onClick={() => handleClickRoom(val)}
                    className="boxRoom"
                    key={index}
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
                    <div>
                      <img
                        style={{ width: "110px" }}
                        alt=""
                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1"
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <span style={{ fontSize: "17px", fontWeight: "bold" }}>Loại phòng: {val.title}</span>
                      <span>Giá phòng: {val.price}</span>
                      <span>Số người: {val.maxPeople}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h2>Phòng đã chọn</h2>

            {Object.keys(roomChoose).length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <div>
                  <img
                    style={{ width: "110px" }}
                    alt=""
                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: "17px", fontWeight: "bold" }}>Loại phòng: {roomChoose?.title}</span>
                  <span>Giá phòng: {roomChoose?.price}</span>
                  <span>Số người: {roomChoose?.maxPeople}</span>
                </div>
                <div>
                  <DateTimePicker onChange={setDateApply} value={dateApply} minDate={new Date()} />
                  <div>
                    <span>{new Date(dateApply).toDateString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
