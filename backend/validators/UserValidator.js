const yup = require('yup');

class UserValidator {
  async store(req, res, next) {
    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email('Email inválido').required('Email é obrigatório'),
      password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas não conferem'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (err) {
      return res.status(400).json({
        error: 'Validation failed',
        messages: err.errors,
      });
    }
  }

  async authenticate(req, res, next) {
    const schema = yup.object().shape({
      email: yup.string().email('Email inválido').required('Email é obrigatório'),
      password: yup.string().required('Senha é obrigatória'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (err) {
      return res.status(400).json({
        error: 'Validation failed',
        messages: err.errors,
      });
    }
  }
}

module.exports = new UserValidator();