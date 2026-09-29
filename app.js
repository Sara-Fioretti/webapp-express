const express = require("express")
const app = express()
const port=process.env.PORT || 3000

const movieRouter= require("./routers/movieRouter")
const errorsHandler=require("./middlewares/errorsHandler")
const notFound=require("./middlewares/notFound")

app.use(express.static('public'))
app.use(express.json())


app.get ('/', (req,res)=>{
    res.send('Hello World')
})

app.use("/api/movies", movieRouter)
app.use(errorsHandler)
app.use(notFound)

app.listen (port, ()=>{
    console.log(`App is listening on port ${port}`)
})
