class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel;
    }

    getAll = async (req, res) => {
        try {
            const rows = await this.movieModel.getAll();
            res.status(200).json(rows);
        } catch (e) {
            res.status(500).json({ error: "No se obtenieron datos" });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const row = await this.movieModel.getById(id);
            if (!row) {
                return res.status(404).json({ error: "No se encontro la pelicula" });
            }
            res.status(200).json(row);
        } catch (e) {
            console.log(e.message);
            res.status(500).json({ error: "No se obtubo datos" });
        }
    }

    create = async (req, res) => {
        try {
            const movie = req.body;
            const id = await this.movieModel.create(movie);
            res.status(201).json({ message: "Pelicula agregada", id });
        } catch (e) {
            res.status(500).json({ error: "Error al agregar la pelicula" });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const movie = req.body;
            const result = await this.movieModel.update(id, movie);
            if (result === 0) {
                return res.status(404).json({ error: "No se puede actualizar, no existe" });
            }
            res.status(200).json({ message: "Pelicula actualizada" });
        } catch (e) {
            res.status(500).json({ error: "Error al actualizar" });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.movieModel.delete(id);
            if (result === 0) {
                return res.status(404).json({ error: "No se puede eliminar, no existe" });
            }
            res.status(200).json({ message: "Pelicula eliminada" });
        } catch (e) {
            res.status(500).json({ error: "Error al eliminar" });
        }
    }
}

module.exports = MovieController;