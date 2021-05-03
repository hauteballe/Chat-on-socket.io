const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.username = "Anonymous";

  socket.on("username:change", (username) => {
    socket.username = username;
  });

  socket.on("message:send", (msg) => {
    io.emit("message:send", `${socket.username}: ${msg}`);
  });
});

http.listen(port);
