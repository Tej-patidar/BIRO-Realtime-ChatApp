// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000 ;
// const http =require('http').createServer(app)
// app.get("/",function(req,res){
//     res.sendFile(__dirname + '/index.html')
// })

// http.listen(PORT, ()=>{
// console.log(`Port listning on ${PORT}`)
// });

// module.exports = app;

// ...................................................

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PROCESS || 3000;

http.listen(PORT, () => {
  console.log(`Server Listning on Port ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
module.exports = app;

// socket .....

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
