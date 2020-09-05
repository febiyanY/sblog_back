'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostDownvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostDownvote.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    timestamps : false,
    sequelize,
    modelName: 'PostDownvote',
  });
  return PostDownvote;
};