const mysql = require('mysql2/promise.js');
const dotenv = require('dotenv')

dotenv.config()


// Criar o pool de conexões
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,       // Host do banco de dados
  user: process.env.MYSQL_USER,      // Usuário do MySQL
  password: process.env.MYSQL_PASSWORD,    // Senha do MySQL
  database: process.env.MYSQL_DATABASE,// Nome do banco de dados
  waitForConnections: true, // Espera a liberação de uma conexão se o pool estiver cheio
  connectionLimit: 10,      // Número máximo de conexões no pool
  queueLimit: 0             // Limite de solicitações na fila, 0 significa sem limite
});

// Função para obter uma conexão do pool
async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    throw new Error('Erro ao obter conexão: ' + err.message);
  }
}

// Função para liberar a conexão
async function releaseConnection(connection) {
  try {
    if (connection) {
      await connection.release();
    }
  } catch (err) {
    console.error('Erro ao liberar a conexão:', err.message);
  }
}

module.exports = { getConnection, releaseConnection, pool };
