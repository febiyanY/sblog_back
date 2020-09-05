module.exports = {
    development: {
        username: "postgres",
        password: 'dbss040',
        database: "stupid_blog_2",
        host: "127.0.0.1",
        dialect: "postgres",
        logging : false,
        // define : {
        //     timestamps: false
        // },
    },
    test: {
        username: "postgres",
        password: 'dbss040',
        database: "stupid_blog_2_test",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "postgres",
        use_env_variable : 'DATABASE_URL'
    }
}