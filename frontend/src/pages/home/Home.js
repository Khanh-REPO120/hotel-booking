import { Link, useNavigate } from "react-router-dom";
import Featured from "../../components/web/featured/Featured";
import FeaturedProperties from "../../components/web/featuredProperties/FeaturedProperties";
import Footer from "../../components/web/footer/Footer";
import Header from "../../components/web/header/Header";
import MailList from "../../components/web/mailList/MailList";
import Navbar from "../../components/web/navbar/Navbar";
import PropertyList from "../../components/web/propertyList/PropertyList";
import "./home.scss";
import { BOOKING_LOCATION } from "../../constant";

const Home = () => {
  const navigate = useNavigate();
  const navigateProvince = (province) => {
    return navigate("/hotels", {
      state: {
        destination: province,
        dates: [{ startDate: new Date(), endDate: new Date() }],
        options: { adult: 1, children: 0, room: 1 },
      },
    });
  };
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Tìm theo loại</h1>
        <PropertyList />

        {[
          "Top yêu thích",
          "Có thể bạn chưa biết",
          "Khách sạn giá rẻ ngay hôm nay",
          "Du lịch mùa hè với khách sạn giá rẻ?",
        ].map((item, index) => (
          <>
            <h1 className="homeTitle">{item}</h1>
            <FeaturedProperties />
          </>
        ))}
        <div className="provinceTitle">Địa điểm yêu thích của bạn là gì?</div>
        <div className="provincesList">
          {BOOKING_LOCATION.map((item, index) => (
            <div onClick={() => navigateProvince(item)} className="provinceItem" key={index}>
              {item}
            </div>
          ))}
        </div>
        <MailList />
        <div className="provinceTitle">Công ty liên kết</div>
        <div class="companyList">
          <div>
            <img
              src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_booking/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0.png"
              title="Booking.com"
              alt="Booking.com"
              height="26"
              width="91"
            />
          </div>
          <div>
            <img
              src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png"
              title="Priceline"
              alt="Priceline"
              height="26"
              width="91"
            />
          </div>
          <div>
            <img
              src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png"
              title="Kayak"
              alt="Kayak"
              height="26"
              width="79"
            />
          </div>
          <div>
            <img
              src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png"
              title="Agoda"
              alt="Agoda"
              height="26"
              width="70"
            />
          </div>
          <div>
            <img
              src="https://cf.bstatic.com/static/img/tfl/group_logos/logo_opentable/a4b50503eda6c15773d6e61c238230eb42fb050d.png"
              title="OpenTable"
              alt="OpenTable"
              height="26"
              width="95"
            />
          </div>
        </div>
        <div className="promotionList">
          <img
            src="https://t-cf.bstatic.com/design-assets/assets/v3.109.0/illustrations-traveller/GlobeGeniusBadge.png"
            alt=""
          />
          <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
            <h2>Nhận khuyến mãi tức thì</h2>
            <p>Chỉ cần đăng kí tài khoản TOPBOOKING ngay hôm nay - Với mùa hè du lịch trải nghiệm thú vị</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                <div style={{ padding: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", borderRadius: "10px" }}>
                  Đăng ký
                </div>
              </Link>
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                <div style={{ padding: "10px" }}>Đăng nhập</div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
