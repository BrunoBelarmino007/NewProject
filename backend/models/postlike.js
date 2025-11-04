'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    }
  }

  PostLike.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'PostLike',
      tableName: 'PostLikes',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'post_id'],
        },
      ],
    }
  );

  return PostLike;
};