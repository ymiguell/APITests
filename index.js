const express = require('express')
const bodyParser = require('body-parser')
const { getConnection, releaseConnection } = require('./connection')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/post/:id", async (request, response) => {
    const { id } = request.params

    if (!id) {
        return response.status(400).json({ error: "O parâmetro de URL 'id' é obrigatório." })
    }

    const sql = 'SELECT * FROM posts WHERE id = ?';
    const pool = await getConnection()
    const [result] = await pool.query(sql, [id])
    releaseConnection()

    return response.status(200).json({
        message: "POST ENCONTRADO!",
        post: {
            id: result[0].id,
            title: result[0].title,
            body: result[0].body,
            authorId: result[0].authorId
        }
    })
})

app.post("/post/create", async (request, response) => {
    try {
        const { title, body, authorId } = request.body

        if (!title) {
            return response.status(400).json({ error: "A chave 'title' do corpo da requisição é obrigatório." })
        }

        if (!body) {
            return response.status(400).json({ error: "A chave 'body' do corpo da requisição é obrigatório." })
        }

        if (!authorId) {
            return response.status(400).json({ error: "A chave 'authorId' do corpo da requisição é obrigatório." })
        }

        const sql = 'INSERT INTO posts (title, body, authorId) VALUES (?,?,?)';
        const pool = await getConnection()
        const result = await pool.query(sql, [title, body, authorId])
        releaseConnection()

        return response.status(200).json({ message: "Post criado com sucesso!" })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal server error" })
    }
})

app.listen(8080, () => {
    console.log("Express server listening on port 8080")
})
