import pool from '../../infra/db/Database.js';

export async function createUser(user) {
    let connection;
    try {
        connection = await pool.getConnection();
        const keys = Object.keys(user)
            .map(el => el)
            .join(',');
        const values = Object.values(user)
            .map(el => `"${el}"`)
            .join(',');

        const [rows, fields] = await connection.query(`INSERT INTO users (${keys}) VALUES (${values}) returning *`);
        return { id: rows[0].id };
    } catch (e) {
        throw e;
    }
}

export async function getUserByRole(query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const { role } = query;
        const [rows, fields] = await connection.query('SELECT * FROM users WHERE role = ?', [role]);
        return rows[0];
    } catch (e) {
        throw e;
    }
}

export async function getUser(params, queryParams) {
    let connection;
    try {
        connection = await pool.getConnection();
        const { id } = params;
        const { role } = queryParams;
        let query = 'SELECT * FROM users WHERE id = ?';
        const dbParams = [id];
        if (role) {
            query += ' AND WHERE role = ?';
            dbParams.push(role);
        }

        const [rows, fields] = await connection.query(query, dbParams);
        return rows[0];
    } catch (e) {
        throw e;
    }
}

export async function getAllUsers() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM users;');
        return rows;
    } catch (e) {
        throw e;
    }
}

export async function updateUser(payload, id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const { full_name, role } = payload;
        console.log(full_name, role, id);
        console.log('============');
        const [result] = await connection.query('UPDATE users SET full_name = ?, role = ? WHERE id = ?', [
            full_name,
            role,
            id,
        ]);

        const [rows, fields] = await connection.execute('select * from users where id = ?', [id]);
        return rows[0];
    } catch (e) {
        throw e;
    }
}

export async function deleteAllUsers() {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query('DELETE FROM users');
    } catch (e) {
        throw e;
    }
}

export async function deleteUser(params) {
    let connection;
    try {
        connection = await pool.getConnection();
        const { id } = params;
        await connection.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (e) {
        throw e;
    }
}
