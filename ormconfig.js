const config = {
    type: "better-sqlite3",
    database: "db.sqlite",
    entities: ["dist/**/*.entity.js"],
    synchronize: false,
};

export default config;