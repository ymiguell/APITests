import { getConnection, releaseConnection } from "../connection.js";

export const postRepository = {
    findPostById: async (id) => {
        const sql = 'SELECT * FROM posts WHERE id = ?';
        const pool = await getConnection()
        const [result] = await pool.query(sql, [id])
        releaseConnection(pool)
        return result;
    },

    createPost: async (title, body, authorId) => {
        const sql = 'INSERT INTO posts (title, body, authorId) VALUES (?,?,?)';
        const pool = await getConnection()
        const result = await pool.query(sql, [title, body, authorId])
        releaseConnection(pool)
    }
}
