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
    const sql = ` 
    SELECT M.*, ROUND(AVG(R.vote)) as average_vote
    FROM movies as M
    LEFT JOIN reviews as R on M.id = R.movie_id
    WHERE M.id = ? `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
                message: "Database query failed"
            })
        }
        const movie = results[0]
        if (!movie || movie.id === null) {
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
            }
            movie.average_vote = movie.average_vote ? parseInt(movie.average_vote) :0;
            res.json({
                ...movie,
                image: req.imagePath + movie.image
            })
        })
    })
}

//STORE: API per salvare nuova recensione
function storeReview (req,res){
const {id} = req.params
const {tex, name, vote}= req.body

const sql = "INSERT INTO reviews {text, name, vote, movie_id} VALUES (?,?,?,?)"
connection.query (sql, [text, name, vote, id], (err,results)=>{
    if(err){
        return res.status (500).json({
            error:err.message
        })
    }
    res.status(201)
    res.json({
        message:"Review Added",
        id:results.insertId
    })
})

}
module.exports = { index, show, storeReview }