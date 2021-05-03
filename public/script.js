var socket = io();

var messages = document.querySelector(".messages");
var message = document.getElementById("message");
var form = document.getElementById("form");
var input = document.getElementById("message");
var username = document.getElementById("username");
var send_message = document.getElementById("#send_message");
var send_username = document.getElementById("send_username");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("message:send", input.value);
    input.value = "";
  }
});

send_username.addEventListener("click", (ev) => {
  socket.emit("username:change", username.value);
});

socket.on("message:send", function (msg) {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
