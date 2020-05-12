// ./node_modules/nodemon/bin/nodemon.js src/app.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Enables incoming requests to be decoded and parsed as json objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encode:true }));

app.get("/", (req, res) => {
  res.json({ "message": "Server can respond"});
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})