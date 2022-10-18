import { Link } from "react-router-dom";
import { BOOKING_TYPE } from '../../../constant';
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">Cách trung tâm thành phố: {item.distance}m</span>
        <span className="siTaxiOp">{BOOKING_TYPE[item.type]}</span>
        <span className="siSubtitle">
          {item.title}
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Địa chỉ: {item.address}</span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Xem chi tiết</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
