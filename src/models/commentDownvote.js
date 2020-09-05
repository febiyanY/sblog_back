'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentDownvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CommentDownvote.init({
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    timestamps : false,
    sequelize,
    modelName: 'CommentDownvote',
  });
  return CommentDownvote;
};