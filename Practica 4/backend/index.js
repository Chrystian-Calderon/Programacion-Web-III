const express = require("express");
const cors = require("cors");
const movieModel = require("./models/movie.model");
const MovieRouter = require("./routes/movie.routes");

const app = express();
const port = 3000;

app.use(cors("localhost:5173"));
app.use(express.json());

app.use("/movies", MovieRouter({movieModel}));

app.listen(port, () => {
    console.log("Server " + port);
})