import Sequelize from 'sequelize';
import models from '../models/index.js';
import { boxenLog } from '../utils/boxenLogs.util.js';

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_DB,
    DATABASE_SYNCHRONIZE,
    DATABASE_DIALECT,
} = process.env;

class Database {
    sequelize = null;

    constructor() {}

    async connect() {
        try {
            this.sequelize = new Sequelize(DATABASE_DB, DATABASE_USER, DATABASE_PASSWORD, {
                dialect: DATABASE_DIALECT,
                port: DATABASE_PORT,
                host: DATABASE_HOST,
                synchronize: DATABASE_SYNCHRONIZE,
                define: {
                    timestamps: false,
                },
                logging: (log) => boxenLog({ log, title: 'REQUEST', color: 'magenta' }),
            });

            await this.sequelize.authenticate();
            boxenLog({
                log: '# DB Connection has been established successfully.',
                color: 'green',
            });
        } catch (err) {
            throw err;
        }
    }

    async init() {
        Object.values(models).forEach((model) => {
            model.init(this.sequelize);
        });

        this.sequelize.sync();

        Object.values(models)
            .filter((model) => typeof model.associate === 'function')
            .forEach((model) => model.associate(models));
    }
}

export default new Database();
