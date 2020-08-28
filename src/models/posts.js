import Sequelize, {Model} from 'sequelize'
import sequelize from '../db/db'
import User from './users'
import Comment from './comments'

class Post extends Model {}

Post.init({
    key : {
        type : Sequelize.STRING,
        allowNull : false
    },
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },
    body : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    time : {
        type : Sequelize.DATE,
        defaultValue : Sequelize.NOW
    }
}, {sequelize, modelName : 'post'})

Post.belongsTo(User)
User.hasMany(Post)
Comment.belongsTo(Post, {onDelete : 'CASCADE'})
Post.hasMany(Comment)

export default Post