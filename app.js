const express = require("express")
const app = express()
const port=process.env.PORT || 3000

const movieRouter= require("./routers/movieRouter")

app.use(express.static('public'))
app.use(express.json())


app.get ('/', (req,res)=>{
    res.send('Hello World')
})

app.use("/api/movies", movieRouter)

app.listen (port, ()=>{
    console.log(`App is listening on port ${port}`)
})
