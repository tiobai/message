const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const join = require("path")

app.use(express.static(__dirname + "/public"));
const port = process.env.PORT || 4000;

const messages = [];

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        messages.push(msg);
      io.emit('chat message', msg);
    });
  });

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
