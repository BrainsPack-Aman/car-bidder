
import { DataSourceOptions } from 'typeorm';
import { User } from './src/users/users.entity.js';
import { Report } from './src/reports/reports.entity.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

const commonConfig = {
    entities: [User, Report],
    synchronize: false,
};

let dbConfig: DataSourceOptions;

switch (process.env.NODE_ENV) {
    case 'development':
        dbConfig = {
            ...commonConfig,
            type: 'better-sqlite3',
            database: 'db.sqlite',
            migrations: [
                join(rootDir, 'src/migrations/*.{js,ts}'),
            ],
        };
        break;

    case 'test':
        dbConfig = {
            ...commonConfig,
            type: 'better-sqlite3',
            database: 'test.sqlite',
            migrations: [
                join(rootDir, 'src/migrations/*.{js,ts}'),
            ],
        };
        break;

    case 'production':
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL is required in production');
        }

        dbConfig = {
            ...commonConfig,
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrations: [
                join(rootDir, 'src/migrations/*.js'),
            ],
            ssl: false,
        };
        break;

    default:
        throw new Error(
            `Unknown environment: ${process.env.NODE_ENV}`,
        );
}

export default dbConfig;
