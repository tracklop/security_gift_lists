import 'dotenv/config';

export default {
    development: {
        schema: process.env.DATABASE_SCHEMA,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        dialect: process.env.DATABASE_DIALECT,
        synchronize: process.env.SYNCHRONIZE,
    },
    production: {
        schema: process.env.DATABASE_SCHEMA,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        dialect: process.env.DATABASE_DIALECT,
        synchronize: process.env.SYNCHRONIZE,
    },
};
