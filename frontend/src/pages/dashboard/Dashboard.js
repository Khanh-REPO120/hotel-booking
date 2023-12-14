import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";
import Widget from "../../components/widget/Widget";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
