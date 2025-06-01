const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoutes = require("./routes/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/url", urlRoutes);

//Starting Server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));