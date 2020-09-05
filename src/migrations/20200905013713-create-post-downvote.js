'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostDownvotes', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        allowNull :false,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      },
      postId: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        allowNull :false,
        references : {
          model : {
            tableName : 'Posts'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostDownvotes');
  }
};