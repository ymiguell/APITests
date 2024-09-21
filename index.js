import express from 'express'
import bodyParser from 'body-parser'
import postRouter from './routes/post.route.js'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(postRouter)

app.listen(8080, () => {
    console.log("Express server listening on port 8080")
})
