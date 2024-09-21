import { postRepository } from "../repositories/post.repository.js";

export const findPost = async (request, response) => {
    const { id } = request.params

    if (!id) {
        return response.status(400).json({ error: "O parâmetro de URL 'id' é obrigatório." })
    }

    const result = await postRepository.findPostById(id)

    return response.status(200).json({
        message: "POST ENCONTRADO!",
        post: {
            id: result[0].id,
            title: result[0].title,
            body: result[0].body,
            authorId: result[0].authorId
        }
    })
}

export const createPost = async (request, response) => {
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

        await postRepository.createPost(title, body, authorId)

        return response.status(200).json({ message: "Post criado com sucesso!" })
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal server error" })
    }
}