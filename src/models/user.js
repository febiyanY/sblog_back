'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      })
      User.belongsToMany(models.Post, {
        foreignKey : 'userId',
        as : 'PostUpvotes',
        through : models.PostUpvote
      })
      User.belongsToMany(models.Post, {
        foreignKey : 'userId',
        as : 'PostDownvotes',
        through : models.PostDownvote
      })
      User.belongsToMany(models.Comment, {
        foreignKey : 'userId',
        as : 'CommentUpvotes',
        through : models.CommentUpvote
      })
      User.belongsToMany(models.Comment, {
        foreignKey : 'userId',
        as : 'CommentDownvotes',
        through : models.CommentDownvote
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    display_name: DataTypes.STRING,
    ava: DataTypes.STRING,
    type: {
      type : DataTypes.STRING,
      defaultValue : 'client'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10)
    return
  })
  return User;
};