'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        "posts",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false, // Tornar obrigatório
            references: {
              model: "users", // Nome em minúsculo
              key: "id",
            },
            onUpdate: "CASCADE", // Adicionar CASCADE
            onDelete: "CASCADE",
          },
          title: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          text: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          summary: {
            type: Sequelize.STRING(500),
            allowNull: false,
          },
          available_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
        { transaction },
      )

      await queryInterface.addIndex("posts", ["user_id"], { transaction })
      await queryInterface.addIndex("posts", ["available_at"], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable("posts", { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
