import envs from '../../config/envs.js';
import mysql2 from 'mysql2/promise';
import { getTables } from './helpers/getTables.js';

const connection = await mysql2.createConnection({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB,
});

async function createTables({ fileNames, tables }) {
    try {
        await connection.beginTransaction(err => {
            if (err) throw err;
        });
        const promises = tables.map(table => connection.execute(table));
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

export default connection;
