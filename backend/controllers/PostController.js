const { Post, User, PostLike } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');


class PostController {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const limit = 5;
      const offset = (page - 1) * limit;

      // Buscar posts publicados, ordenados por data
      const posts = await Post.findAll({
        where: {
          available_at: {
            [Op.lte]: new Date(), // Menor ou igual à data atual
          },
        },
        order: [['available_at', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: PostLike,
            as: 'likes',
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('likes.id')), 'total_likes'],
          ],
        },
        group: ['Post.id', 'user.id'],
        subQuery: false,
      });

      // Adicionar allowEdit e allowRemove
      const postsWithPermissions = posts.map((post) => {
        const postJson = post.toJSON();
        return {
          ...postJson,
          allowEdit: req.userId === post.user_id,
          allowRemove: req.userId === post.user_id,
        };
      });

      return res.json(postsWithPermissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar posts' });
    }
  }

  async createPost(req, res) {
    try {
      const post = await Post.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar post' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Verificar se o usuário é o dono do post
      if (post.user_id !== req.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para editar este post' });
      }

      await post.update(req.body);

      return res.json(post);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Verificar se o usuário é o dono do post
      if (post.user_id !== req.userId) {
        return res.status(403).json({ error: 'Você não tem permissão para remover este post' });
      }

      await post.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover post' });
    }
  }
}

module.exports = new PostController();