import { Link } from 'react-router-dom';
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      Home page
      <br/><br/>
      <Link to={`/admin`} activeClassName="current">Dashboard</Link>
    </div>
  );
};

export default Home;
