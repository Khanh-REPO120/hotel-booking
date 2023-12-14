import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns, addroom, order }) => {
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

  const handleOrder = async (id) => {
    try {
      await axios.put(`/admin/active-order/${id}`).then(function (response) {
        window.location.reload(true);
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

  const orderColumn = [
    {
      field: "book_data",
      headerName: "Hotel",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <div>{row?.book_data?.[0]?.hotel?.name}</div>
        );
      },
    },
    {
      field: "total_price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleOrder(params.row._id)}
            >
              Accept
            </div>
          </div>
        );
      },
    },

  ]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {order ? <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(orderColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={row => row._id}
      /> : <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={row => row._id}
      />}

    </div>
  );
};

export default Datatable;
