import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar web">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Topbooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            { user.username }
            {user.isAdmin && (
              <button className="navButton">
                <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
                  Dashboard
                </Link>
              </button>
            )}
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
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
