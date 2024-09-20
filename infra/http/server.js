import express from 'express';
import envs from '../../config/envs.js';
import userRoutes from '../../core/controllers/users.js';
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

export default function httpServerInit() {
    app.listen(envs.PORT, () => console.log('Listening on 8080'));
}
