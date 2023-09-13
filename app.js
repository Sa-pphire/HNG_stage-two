const express = require("express");
const app = express();

//database
const db = require("./app/models");
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./app/routes/index')(app);
app.get("/", (req, res) => {
    res.json({ message: "Stage Two API." });
  });

// error handler
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});