import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
const NewRoom = () => {
  const [info, setInfo] = useState({});
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const pathArr = location.pathname.split("/");
  const path = pathArr[1] + '/' + pathArr[2];
  const idParam = pathArr[4] || ""
  const { data } = useFetch(`/admin/hotels/find/${idParam}`);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}/${idParam}`).then(function (response) {
        window.location.reload(true);
      });
    } catch (err) { }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>

          </div>
        );
      },
    },

  ];
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/admin/rooms/${idParam}`, { ...info, roomNumbers }).then(function (response) {
        window.location.reload(true);
      })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="bottom">
          <form>
            <div className="right">
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Số phòng</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="đánh dấu phẩy giữa các số phòng, Ex: 102, 103"
                />
              </div>
            </div>
            <button onClick={handleClick}>Send</button>
          </form>
        </div>
        <DataGrid
          className="datagrid"
          rows={data?.rooms || []}
          columns={roomColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={row => row._id}
        />
      </div>
    </div>
  );
};

export default NewRoom;
