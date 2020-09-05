'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostUpvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostUpvote.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    timestamps : false,
    sequelize,
    modelName: 'PostUpvote',
  });
  return PostUpvote;
};