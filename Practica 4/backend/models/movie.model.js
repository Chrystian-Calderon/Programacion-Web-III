const connection = require("../config/db");

class Movies {
    async getAll() {
        const sql = "SELECT * FROM movies";
        const [rows] = await connection.query(sql);
        return rows;
    }

    async getById(id) {
        const sql = "SELECT * FROM movies WHERE id_movie = ?";
        const [rows] = await connection.query(sql, [id]);
        return rows[0];
    }

    async create(movie) {
        const sql = "INSERT INTO movies (title, genre, realeseYear) VALUES (?, ?, ?)";
        const [result] = await connection.query(sql, [movie.title, movie.genre, movie.realeseYear]);
        return result.insertId;
    }

    async update(id, movie) {
        const sql = "UPDATE movies SET title = ?, genre = ?, realeseYear = ? WHERE id_movie = ?";
        const [result] = await connection.query(sql, [movie.title, movie.genre, movie.realeseYear, id]);
        return result.affectedRows;
    }

    async delete(id) {
        const sql = "DELETE FROM movies WHERE id_movie = ?";
        const [result] = await connection.query(sql, [id]);
        return result.affectedRows;
    }
}

module.exports = new Movies();