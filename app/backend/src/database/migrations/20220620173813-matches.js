"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      home_team: {
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
        ondelete: "CASCADE",
        onupdate: "CASCADE",
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
      },
      away_team: {
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
        ondelete: "CASCADE",
        onupdate: "CASCADE",
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
