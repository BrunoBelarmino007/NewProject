'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
      this.hasMany(models.PostLike, { foreignKey: "post_id", as: "likes" })
    }
  }

  Post.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        validate: {
          notNull: { msg: "ID do usuário é obrigatório" },
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: "Título é obrigatório" },
          notEmpty: { msg: "Título não pode ser vazio" },
          len: {
            args: [8, 20],
            msg: "Título deve ter entre 8 e 20 caracteres",
          },
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Texto é obrigatório" },
          notEmpty: { msg: "Texto não pode ser vazio" },
        },
      },
      summary: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notNull: { msg: "Resumo é obrigatório" },
          notEmpty: { msg: "Resumo não pode ser vazio" },
          len: {
            args: [20, 100],
            msg: "Resumo deve ter entre 20 e 100 caracteres",
          },
        },
      },
      available_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Data de publicação é obrigatória" },
          isDate: { msg: "Data de publicação deve ser uma data válida" },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: true,
      underscored: true,
    },
  )

  return Post;
};