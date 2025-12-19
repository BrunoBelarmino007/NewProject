'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "user_id", as: "posts" })
      this.hasMany(models.PostLike, { foreignKey: "user_id", as: "likes" })
    }

    async checkPassword(password) {
      return bcrypt.compare(password, this.password)
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: "Nome é obrigatório" },
          notEmpty: { msg: "Nome não pode ser vazio" },
          len: {
            args: [8, 30],
            msg: "Nome deve ter entre 8 e 30 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email é obrigatório" },
          notEmpty: { msg: "Email não pode ser vazio" },
          isEmail: { msg: "Email inválido" },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: "Senha é obrigatória" },
          notEmpty: { msg: "Senha não pode ser vazia" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10)
          }
        },
      },
    },
  )

  return User;
};