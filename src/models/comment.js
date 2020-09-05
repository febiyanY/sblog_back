'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey : 'userId'
      })
      Comment.belongsTo(models.Post, {
        foreignKey : 'postId'
      })
      Comment.belongsTo(models.Comment, {
        foreignKey : 'quoted',
        as : 'reply'
      })
      Comment.belongsToMany(models.User, {
        foreignKey : 'commentId',
        as : 'CommentUpvotes',
        through : models.CommentUpvote
      })
      Comment.belongsToMany(models.User, {
        foreignKey : 'commentId',
        as : 'CommentDownvotes',
        through : models.CommentDownvote
      })
    }
  };
  Comment.init({
    body: DataTypes.TEXT,
    time: {
      type : DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    votes : {
      type : DataTypes.INTEGER,
      defaultValue : 0
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};