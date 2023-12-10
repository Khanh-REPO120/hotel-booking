import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="navbar web">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Topbooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            {user.username}
            <button className="navButton">
              <Link to="/chat" style={{ color: "inherit", textDecoration: "none" }}>
                Chat
              </Link>
            </button>
            <button className="navButton">
              <Link to="/my-orders" style={{ color: "inherit", textDecoration: "none" }}>
                My Order
              </Link>
            </button>
            {user.isAdmin ? (
              <button className="navButton">
                <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
                  Dashboard
                </Link>
              </button> 
            ) : (
              <button className="navButton" onClick={() => dispatch({ type: "LOGOUT" })}>
                Đăng xuất
              </button>
            )}
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                Đăng ký
              </Link>
            </button>
            <button className="navButton">
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                Đăng nhập
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
