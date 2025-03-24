const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const router = require("./Routes/ComplaintRoutes");
const app = express();
const cors = require("cors");

// Middleware
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/complaints", router);

// MongoDB connection
mongoose.connect("mongodb+srv://admin:ZW5sTNjC2ZfltIZd@cluster0.qehoc.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    // Start the server once MongoDB is connected
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successful');
});

// Setup routes
const evidanceRouter = require('./Routes/evidanceRoutes');
app.use('/evidences', evidanceRouter);
app.use('/images', express.static('images'));
