const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

const movieRouter = require("./routers/movieRouter")
const errorsHandler = require("./middlewares/errorsHandler")
const notFound = require("./middlewares/notFound")
const imagePath = require("./middlewares/imagePath")


app.use(express.static('public'))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173'}))


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use("/api/movies", movieRouter)
app.use(errorsHandler)
app.use(notFound)
app.use(imagePath)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
