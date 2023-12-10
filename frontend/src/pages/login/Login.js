import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { userLoginInputs } from "../../formSource";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data) {
        
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
      <div className="new">
        <div className="newContainer" style={{"textAlign": "center", "padding": "50px"}}>
          {error && (
            <p style={{"padding": "20px 50px", "color": "red"}}>{error.message}</p>
          )}
          <div className="bottom" style={{"display": "inline-block", "width": "450px"}}>
            <form className="form_input">
              {userLoginInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick} style={{"marginTop": "50px"}}>Đăng Nhập</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
