const { PostLike, Post } = require('../models');


class PostLikeController {
  async toggle(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      // Verificar se post existe
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Verificar se já deu like
      const existingLike = await PostLike.findOne({
        where: {
          user_id: userId,
          post_id: id,
        },
      });

      if (existingLike) {
        // Remover like (deslike)
        await existingLike.destroy();
        return res.json({ message: 'Like removido' });
      } else {
        // Adicionar like
        await PostLike.create({
          user_id: userId,
          post_id: id,
        });
        return res.json({ message: 'Like adicionado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar like' });
    }
  }
}

module.exports = new PostLikeController();
