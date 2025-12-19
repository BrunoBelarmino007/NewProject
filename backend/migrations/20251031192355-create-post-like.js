'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        "post_likes",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false, // Tornar obrigatório (pois um like sem usuário não faz sentido)
            references: {
              model: "users",
              key: "id",
            },
            onUpdate: "CASCADE", // Se ID do usuário mudar, atualiza automaticamente
            onDelete: "CASCADE", // Se usuário for removido, deleta likes relacionados
          },
          post_id: {
            type: Sequelize.INTEGER,
            allowNull: false, // Tornar obrigatório (pois um like sem post não faz sentido)
            references: {
              model: "posts",
              key: "id",
            },
            onUpdate: "CASCADE", // Se ID do post mudar, atualiza automaticamente
            onDelete: "CASCADE", // Se post for removido, deleta likes relacionados (evitando assim lixo no banco)
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

      await queryInterface.addIndex("post_likes", ["user_id", "post_id"], {
        unique: true,
        name: "post_likes_user_id_post_id_unique",
        transaction,
      })

      await queryInterface.addIndex("post_likes", ["post_id"], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable("post_likes", { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
