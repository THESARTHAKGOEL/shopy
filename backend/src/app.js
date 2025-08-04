require("dotenv").config();
const express = require("express");
const productRouter = require("./routes/product.router");
const indexRouter = require("./routes/index.router");
const userRouter = require("./routes/user.router");
const app = express();
const path = require("path");
const morgon = require("morgan");
const cors = require("cors");

app.use(morgon("dev"));

app.use(
  cors({
    origin: "https://shopy-frontend-t4vg.onrender.com",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

module.exports = app;
