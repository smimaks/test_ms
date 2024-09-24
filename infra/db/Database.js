import envs from '../../config/envs.js';
import mysql2 from 'mysql2/promise';
import { getTables } from './helpers/getTables.js';

const pool = await mysql2.createPool({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB,
});

async function createTables({ fileNames, tables }) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction(err => {
            if (err) throw err;
        });
        const promises = tables.map(table => connection.query(table));
        await Promise.all(promises);
        await connection.commit();
        console.log('Success create db scripts in ' + fileNames + ' files!');
    } catch (e) {
        await connection.rollback(err => {
            if (err) throw err;
        });
        console.log('Create table is failed', e.message);
    }
}

const { fileNames, tables } = getTables();
createTables({ fileNames, tables });

export default pool;
