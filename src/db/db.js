import {Sequelize} from 'sequelize'

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host : process.env.DB_HOST,
//     dialect : process.env.DB_DIALECT,
//     pool : {
//         max :5,
//         min : 0,
//         acquire : 30000,
//         idle : 10000
//     },
//     define : {
//         timestamps : false
//     },
//     logging : false
// })

const db = new Sequelize(process.env.DATABASE_URL,{
    logging : false
})

export default db