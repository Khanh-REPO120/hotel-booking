import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

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
