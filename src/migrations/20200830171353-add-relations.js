'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Posts', 'userId', {
      type : Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'SET NULL',
        allowNull : false
    })
    await queryInterface.addColumn('Comments', 'userId', {
      type : Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'SET NULL',
        allowNull : false
    })
    await queryInterface.addColumn('Comments', 'postId', {
      type : Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Posts'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE',
        allowNull : false
    })
    await queryInterface.addColumn('Comments', 'quoted', {
      type : Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Comments'
          },
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'SET NULL',
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Posts', 'userId')
    await queryInterface.removeColumn('Comments', 'userId')
    await queryInterface.removeColumn('Comments', 'postId')
    await queryInterface.removeColumn('Comments', 'quoted')
  }
};
