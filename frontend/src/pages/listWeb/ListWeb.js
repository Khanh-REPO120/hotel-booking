import "./list.css";
import Navbar from "../../components/web/navbar/Navbar";
import Header from "../../components/web/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/web/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { BOOKING_LOCATION, BOOKING_TYPE } from '../../constant';

const ListWeb = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [type, setType] = useState(location.state.type || '');
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/v1/hotels?city=${destination}&type=${type}&min=${min || 0 }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Tìm kiếm</h1>
            <div className="lsItem">
              <label>Điểm đến</label>
              <select className="headerSearchSelect" onChange={(e) => setDestination(e.target.value)}>
                <option key="0" value="">--Bạn muốn đến đâu?---</option>
                {
                  BOOKING_LOCATION.map((location, index) => {
                    return (
                      <option key={index} value={location} selected={ destination == location }>
                        {location}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <div className="lsItem">
              <label>Loại</label>
              <select className="headerSearchSelect" onChange={(e) => setType(e.target.value)}>
                <option key="0" value="">--Tất cả---</option>
                {
                  Object.keys(BOOKING_TYPE).map((key, index) => {
                    return (
                      <option key={index} value={key} selected={ type == key }>
                        {BOOKING_TYPE[key]}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Tùy chọn</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá tối thiểu
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá tối đa
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Người lớn</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Trẻ con</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Phòng</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Lọc</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {
                  data.length > 0 ? (
                    <>
                      {data.map((item) => (
                        <SearchItem item={item} key={item._id} />
                      ))}
                    </>
                    ) : (
                      <p>Đang cập nhật ...</p>
                    )
                }
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListWeb;
