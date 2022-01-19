require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const router = require("./routes");
const Role = db.role;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    origin: "https://sprymann-todo-application-frnt.herokuapp.com",
    optionsSuccessStatus: 200,
  })
);
app.options("*", cors());
app.use("/api", router);

db.sequelize.sync(
  Role.findOne({ where: { id: 1 } }).then((role) => {
    if (!role) {
      Role.create({ id: 1, title: "USER" });
    }
  })
);

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
