import useFetch from "../../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/v1/hotels/countByCity?cities=hanoi,tphcm,hoian"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://t-cf.bstatic.com/xdata/images/xphoto/300x240/140009654.jpg?k=a3325530ab89dc0e4af224d61d4cd084a386a089ff08076053437562b117745d&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              <h2>Cách đây 0,6km</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://t-cf.bstatic.com/xdata/images/xphoto/300x240/140009627.jpg?k=523e6e214e213e868befa01d37c57e1becaa09b829eb08a8804c0bc0273ea67c&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>TP. Hồ Chí Minh</h1>
              <h2>Cách đây 1.145km</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://t-cf.bstatic.com/xdata/images/xphoto/300x240/140009652.jpg?k=362912454175551abcb0dc3ae419875b11628fccf6d95ed699a8063173c8f5a6&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hội An</h1>
              <h2>Cách đây 630km</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
