'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey : 'userId'
      })

      Post.belongsToMany(models.User, {
        foreignKey : 'postId',
        as : 'PostUpvotes',
        through : models.PostUpvote
      })
      Post.belongsToMany(models.User, {
        foreignKey : 'postId',
        as : 'PostDownvotes',
        through : models.PostDownvote
      })
    }
  };
  Post.init({
    key: DataTypes.STRING,
    title: DataTypes.STRING,
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
    modelName: 'Post',
  });
  return Post;
};