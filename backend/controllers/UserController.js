const { User } = require('../models');
const jwt = require('jsonwebtoken');

class UserController {
  async store(req, res) {
    try {
      const { email } = req.body;

      // Verificar se email já existe
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      // Criar usuário (senha será criptografada automaticamente pelo hook)
      const user = await User.create(req.body);

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuário por email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      // Verificar senha
      const isPasswordValid = await user.checkPassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao autenticar' });
    }
  }
}

module.exports = new UserController();