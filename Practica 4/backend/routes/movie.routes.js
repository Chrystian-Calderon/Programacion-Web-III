const express = require("express");
const MovieController = require("../controllers/movie.controller");

module.exports = ({ movieModel }) => {
    const router = express.Router();

    const movies = new MovieController({ movieModel });

    router.get("/:id", movies.getById);
    router.get("/", movies.getAll);
    router.post("/", movies.create);
    router.put("/:id", movies.update);
    router.delete("/:id", movies.delete);

    return router;
}