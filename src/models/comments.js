import Sequelize, {Model} from 'sequelize'
import sequelize from '../db/db'
import User from './users'

class Comment extends Model {}

Comment.init({
    body : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    time : {
        type : Sequelize.DATE,
        defaultValue : Sequelize.NOW
    }
}, {sequelize, modelName : 'comment'})

Comment.belongsTo(Comment, {as : 'reply', foreignKey : 'quoted'})
Comment.belongsTo(User, {onDelete : 'CASCADE'})
User.hasMany(Comment)

export default Comment