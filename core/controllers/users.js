import express, { response } from 'express';
import {
    createUser,
    deleteAllUsers,
    deleteUser,
    getAllUsers,
    getUser,
    getUserByRole,
    updateUser,
} from '../services/usersService.js';
const userRoutes = express.Router();

userRoutes.post('/create', async (req, res) => {
    let response;
    try {
        const { body } = req;
        const result = await createUser(body);
        response = {
            success: true,
            result,
        };
    } catch (e) {
        console.log('CREATE USER ERROR');
        console.log(e);
        response = {
            success: false,
            result: {
                stack: e.stack.stack,
                message: e.message,
            },
        };
    } finally {
        res.send(response);
    }
});

userRoutes.get('/get/:id', async (req, res) => {
    let response;
    try {
        const { query, params } = req;
        const result = await getUser(params, query);
        response = {
            success: true,
            result,
        };
    } catch (e) {
        console.log('GET USERS ERROR WITH PARAMS');
        console.log(e);
        response = {
            success: false,
            result: {
                stack: e.stack.stack,
                message: e.message,
            },
        };
    } finally {
        res.send(response);
    }
});

userRoutes.get('/get', async (req, res) => {
    let response;
    try {
        let result;
        const { query } = req;

        if (query.role) {
            result = await getUserByRole(query);
        } else {
            result.users = await getAllUsers();
        }
        response = {
            success: true,
            result,
        };
    } catch (e) {
        console.log('GET USERS ERROR');
        console.log(e);
        response = {
            success: false,
            result: {
                stack: e.stack.stack,
                message: e.message,
            },
        };
    } finally {
        res.send(response);
    }
});

userRoutes.patch('/update/:id', async (req, res) => {
    let response;
    try {
        const { body, params } = req;
        const result = await updateUser(body, params.id);
        response = {
            success: true,
            result,
        };
    } catch (e) {
        console.log('UPDATE ERROR');
        console.log(e);
        response = {
            success: false,
            result: {
                stack: e.stack.stack,
                message: e.message,
            },
        };
    } finally {
        res.send(response);
    }
});

userRoutes.delete('/delete/:id', async (req, res) => {
    let response;
    try {
        await deleteUser(req.params);

        response = {
            success: true,
        };
    } catch (e) {
        console.log('DELETE ERROR');
        console.log(e);
        response = {
            success: false,
            result: {
                stack: e.stack.stack,
                message: e.message,
            },
        };
    } finally {
        res.send(response);
    }
});

userRoutes.delete('/delete', async (req, res) => {
    let response;
    try {
        await deleteAllUsers();
        response = {
            success: true,
        };
    } catch (e) {
        console.log('DELETE ERROR');
        console.log(e);
        response = {
            success: false,
            result: {
                stack: e.stack.stack,
                message: e.message,
            },
        };
    } finally {
        res.send(response);
    }
});

export default userRoutes;
