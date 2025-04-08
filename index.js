const express = require("express");


const app = express();
const PORT = 8001;

//Starting Server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));