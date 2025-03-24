const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); //frontend to access backend

app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

mongoose
  .connect("mongodb+srv://dileesharanadewa2002:Sewmini1.@cluster0.knhpi.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
