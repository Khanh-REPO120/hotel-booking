import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import ordersRoute from "./routes/order.js";
import chatRoute from "./routes/chat.js";
import webRoute from "./routes/web.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { SocketServer } from "./serverSocket.js";
import { Server } from "socket.io";
import { createServer } from 'http';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!")
});



app.use("/api/auth", authRoute);
app.use("/api/admin/users", usersRoute);
app.use("/api/admin/hotels", hotelsRoute);
app.use("/api/admin/rooms", roomsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/admin", ordersRoute);
app.use("/api/messages", chatRoute);
app.use("/api/v1", webRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('Connection established');
  SocketServer(socket)
});

app.set('port', process.env.PORT || 8800);
server.listen(app.get('port'), function () {
  connect()
  var port = server.address().port;
  console.log('Running on : ', port);
});
