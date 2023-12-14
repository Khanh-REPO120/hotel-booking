import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import ListWeb from "./pages/listWeb/ListWeb";
import Hotel from "./pages/hotel/Hotel";
import Order from "./pages/order/Order";
import SocketClient from "./socketClient";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { APPTYPES } from "./redux/reducers/index";
import Chat from "./pages/chat/Chat";
import ChatId from "./pages/chat/ChatId";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  useEffect(() => {
    const socket = io("http://127.0.0.1:8800");

    dispatch({ type: APPTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        {
          user?._id && <SocketClient />
        }


        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="/hotels" element={<ListWeb />} />
          <Route path="/my-orders" element={<Order />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatId />
              </ProtectedRoute>
            }
          />
          <Route path="admin">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} addroom />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms/new">
              <Route
                path=":ProductId"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
