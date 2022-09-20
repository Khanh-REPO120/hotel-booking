import Featured from "../../components/web/featured/Featured";
import FeaturedProperties from "../../components/web/featuredProperties/FeaturedProperties";
import Footer from "../../components/web/footer/Footer";
import Header from "../../components/web/header/Header";
import MailList from "../../components/web/mailList/MailList";
import Navbar from "../../components/web/navbar/Navbar";
import PropertyList from "../../components/web/propertyList/PropertyList";
import "./home.scss";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Tìm theo loại chỗ nghỉ</h1>
        <PropertyList/>
        <h1 className="homeTitle">Nhà ở mà khách yêu thích</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
