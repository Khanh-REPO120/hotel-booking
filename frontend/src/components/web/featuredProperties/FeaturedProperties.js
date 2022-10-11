import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { BOOKING_TYPE } from '../../../constant';

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
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">{BOOKING_TYPE[item.type]} giá chỉ từ ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
