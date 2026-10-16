import mysql from 'mysql2/promise'; 

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'konyvtar',
    port: 3306,
}

const pool = mysql.createPool(dbConfig);

export default pool;