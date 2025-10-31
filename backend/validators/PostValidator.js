const yup = require('yup');

class PostValidator {
  async store(req, res, next) {
    const schema = yup.object().shape({
      title: yup.string().required('Título é obrigatório'),
      text: yup.string().required('Texto é obrigatório'),
      summary: yup.string().required('Resumo é obrigatório'),
      available_at: yup.date().required('Data de publicação é obrigatória'),
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

  async update(req, res, next) {
    const schema = yup.object().shape({
      title: yup.string(),
      text: yup.string(),
      summary: yup.string(),
      available_at: yup.date(),
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

module.exports = new PostValidator();