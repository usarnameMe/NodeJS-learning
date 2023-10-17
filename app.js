const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware!!!!");
  next();
});
app.use((req, res, next) => {
  res.send("<h1>HELLO!!</>");
});

const server = http.createServer(app);

server.listen(3000);
