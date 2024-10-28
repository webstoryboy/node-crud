const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

mongoose
  .connect(
    "mongodb+srv://webstupids:meiu08GCwCQQu04j@cluster0.5ynky.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
