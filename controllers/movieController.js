const connection = require("../data/db")
//INDEX
function index(req, res) {
    const sql = "SELECT * FROM movies"
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
                message: "Database query failed"
            })
        }
        
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })
        res.json(movies)     
    })
}

//SHOW
function show(req, res) {
    const { id } = req.params
    const sql = " SELECT * FROM movies WHERE id=?"

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
                message: "Database query failed"
            })
        }
        const movie = results[0]
        if (!movie) {
            return res.status(404).json({
                message: "Movie does not exist"
            })
        }
        const reviewSql = "SELECT * FROM reviews WHERE movie_id=?"
        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) {
                return res.status(500).json({
                    error: err.message,
                    message: "Database query failed"
                })
            }

            if (reviewResults) {
                movie.reviews = reviewResults
                res.json({
                    ...movie,
                    image: req.imagePath + movie.image
                })
            }
        })
    })
}

module.exports = { index, show }