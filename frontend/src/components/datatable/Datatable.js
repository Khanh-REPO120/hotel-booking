import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns, addroom }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathArr = location.pathname.split("/");
  const path = pathArr[1] + '/' + pathArr[2];
  const { data, loading, error } = useFetch(`/${path}`);



  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`).then(function (response) {
        window.location.reload(false);
      });;
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
            {addroom &&
              <div
                className="deleteButton"
                onClick={() => navigate(`/admin/rooms/new/${params.row._id}`)}
              >
                Add Room
              </div>
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;
