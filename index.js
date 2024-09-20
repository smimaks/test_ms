import httpServerInit from './infra/http/server.js';
import connection from './infra/db/Database.js';
const [rows, fields] = await connection.execute('select now()');
console.log(rows[0]);
httpServerInit();
