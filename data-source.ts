import { DataSource, type DataSourceOptions } from 'typeorm';
import { User } from './src/users/users.entity.js';
import { Report } from './src/reports/reports.entity.js';

const dbConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
  entities: [User, Report],
  synchronize: false,
  migrations: ['src/migrations/*.js'],
};

export default new DataSource(dbConfig);
