"use strict";
var express = require("express"),
  routes = require("./routes"),
  http = require("http"),
  path = require("path");
var socketIO = require("socket.io");

var app = express();

var port = 3000;
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", routes.index);

var server = http.createServer(app);

server.listen(port, function () {
  console.log("Express server listening on port " + port);
});

//socket.ioのインスタンス作成
var io = new socketIO.Server(server);

//クライアントから接続があった時
io.sockets.on("connection", function (socket) {
  //クライアントからmessageイベントが受信した時
  socket.on("message", function (data) {
    //念のためdataの値が正しいかチェック
    if (data && typeof data.text === "string") {
      //メッセージを投げたクライアント以外全てのクライアントにメッセージを送信する。
      socket.broadcast.emit("message", { text: data.text });
    }
  });
});
