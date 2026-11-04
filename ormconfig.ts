// const dbConfig = {
//     synchronize: false,
// };



// switch (process.env.NODE_ENV) {
//     case "development":
//          Object.assign(dbConfig, {
//             type: "better-sqlite3",
//             database:  "db.sqlite",
//             entities: [__dirname + "/src/**/*.entity.js"],
           
//         });
//         break;  
//     case "test":
//         Object.assign(dbConfig, {
//             type: "better-sqlite3",
//             database:  "test.sqlite",
//             entities: [__dirname + "/src/**/*.entity.ts"],
           
//         });
//         break;

//     case "production":
       
//         break;

//     default:
//         throw new Error(`Unknown environment`);
// }

// export default dbConfig;

// import { User } from './users/users.entity.js';
// import { Report } from './reports/reports.entity.js';

// const dbConfig: any = {
//     synchronize: false,
// };

// switch (process.env.NODE_ENV) {
//     case 'development':
//         Object.assign(dbConfig, {
//             type: 'better-sqlite3',
//             database: 'db.sqlite',
//             entities: [User, Report],
//         });
//         break;

//     case 'test':
//         Object.assign(dbConfig, {
//             type: 'better-sqlite3',
//             database: 'test.sqlite',
//             entities: [User, Report],
//         });
//         break;

//     case 'production':
//         Object.assign(dbConfig, {
//             type: 'better-sqlite3',
//             database: 'db.sqlite',
//             entities: [User, Report],
//         });
//         break;

//     default:
//         throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
// }

// export default dbConfig;


import { DataSourceOptions } from 'typeorm';
import { User } from './src/users/users.entity.js';
import { Report } from './src/reports/reports.entity.js';

const dbConfig : DataSourceOptions = {
    type: 'better-sqlite3',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: false,
    migrations:['src/migrations/*.js'],
};


switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            database: 'db.sqlite',
        });
        break;

    case 'test':
        Object.assign(dbConfig, {
            database: 'test.sqlite',
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type:"postgres",
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities:[__dirname + "/src/**/*.entity.js"], 
            ssl:{
                rejectUnauthorized: false
            }
        });
        break;

    default:
        throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
}

export default dbConfig;