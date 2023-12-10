import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MESSAGE_TYPES } from "./redux/reducers/index";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const SocketClient = () => {
  const { socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    socket.emit("johnUser", user?._id);
  }, [socket, user?._id]);

  useEffect(() => {
    socket.on("createMessageToClient", (message) => {
      dispatch({
        type: MESSAGE_TYPES.CREATE_MESSAGE,
        payload: message,
      });
    });
    return () => socket.off("createMessageToClient");
  }, [socket, dispatch]);

  return <></>;
};

export default SocketClient;
