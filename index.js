require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const router = require("./routes");
const Tasks = db.tasks;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api", router);

db.sequelize.sync();

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
