import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { BOOKING_TYPE } from '../../../constant';
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/v1/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={`/hotels/${item._id}`} style={{'text-decoration': 'none'}}>
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <div className="infoItem">
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                  <span className="fpPrice">{BOOKING_TYPE[item.type]} giá chỉ từ ${item.cheapestPrice}</span>
                  {item.rating && <div className="fpRating">
                    <button>{item.rating}</button>
                  </div>}
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
