import { User } from './src/users/users.entity.js';
import { Report } from './src/reports/reports.entity.js';
const dbConfig = {
    type: 'better-sqlite3',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: false,
};
export default dbConfig;
