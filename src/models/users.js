import Sequelize, {Model} from 'sequelize'
import sequelize from '../db/db'
import bcrypt from 'bcrypt'

class User extends Model {}

User.init({
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    display_name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    ava : {
        type : Sequelize.STRING,
        defaultValue : 'defaultava.png'
    },
    type : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : 'client'
    },
    token : {
        type : Sequelize.STRING
    },
    token_expire : {
        type : Sequelize.DATE
    }
},{sequelize, modelName : 'user'})

User.beforeCreate( async (user) => {
    user.password = await bcrypt.hash(user.password, 10)
    return
})

export default User