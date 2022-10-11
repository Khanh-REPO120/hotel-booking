import axios from "axios";
import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { userInputs } from "../../formSource";

const Register = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", info).then(function (response) {
        navigate('/login');
      });
    } catch (err) {
      setErr(err.response.data.message || 'Bạn hãy nhập đầy đủ thông tin');
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer" style={{"textAlign": "center", "padding": "50px"}}>
        {err && (
          <p style={{"padding": "20px 50px", "color": "red"}}>{err}</p>
        )}
        <div className="bottom" style={{"display": "inline-block", "width": "450px"}}>
          <form className="form_input">
            {userInputs.map((input) => (
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
            <button onClick={handleClick} style={{"marginTop": "50px"}}>Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
