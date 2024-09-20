import { config } from 'dotenv';

config();

export default {
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || 'localhost',

    DB_URl: process.env.DB_URl,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB: process.env.DB,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
};
