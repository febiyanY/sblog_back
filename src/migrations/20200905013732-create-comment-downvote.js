'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CommentDownvotes', {
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
      commentId: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        allowNull :false,
        references : {
          model : {
            tableName : 'Comments'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CommentDownvotes');
  }
};