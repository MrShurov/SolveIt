const express = require("express");
const app = express();

app.use(express.static("src"));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("server start");
});
