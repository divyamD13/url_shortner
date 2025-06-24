const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const path = require("path");
const URL = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));    


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRoutes);
app.use("/", staticRoute);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    res.render("home",{
        urls:allUrls
    });
    // res.end(
    //     `<html>
    //     <head>
    //         <title>All URLs</title>
    //     </head>
    //     <body>
    //         <ol>
    //             ${allUrls.map((url) => `<li>${url.shortId} - ${url.originalUrl} - ${url.visitHistory.length}</li>`).join("")}
    //         </ol>
    //     </body>
    //     </html>`
    // )
})

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        },
    );
    res.redirect(entry.redirectUrl);
});

//Starting Server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));