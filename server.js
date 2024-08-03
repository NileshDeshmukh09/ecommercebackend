const express = require("express");
const connectDb = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoutes = require("./routes/order");
const morgan = require("morgan");
const port = 8000;


app.use(morgan('combined')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDb();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send({
    success : true,
    message: "Welcome to Ecommerce Server"});
});

app.use("/users", userRoutes);
app.use("/products", productRoute);
app.use("/orders", orderRoutes);



app.listen(port,  () => {
  console.log(`Server is running on http://localhost:${port}`);
});
