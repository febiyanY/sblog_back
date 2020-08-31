'use strict';
const { User } = require('../models/index')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [
       {
         username : 'admin',
         password : '$2b$10$oK6oM9QQdhqjVsSXWxhaM.xn3N4B/nQa4SMVLMaTnkJh2eqG7BKpi',
         display_name : 'Admin Blog',
         type : 'admin',
         createdAt : new Date(), updatedAt : new Date()
       }
     ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
