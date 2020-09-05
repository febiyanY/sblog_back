'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentUpvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CommentUpvote.init({
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    timestamps : false,
    sequelize,
    modelName: 'CommentUpvote',
  });
  return CommentUpvote;
};