const yup = require('yup');

class PostValidator {
  validate = async (schema, req, res, next) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true, // stripUnknown já implementado
      })
      return next()
    } catch (err) {
      return res.status(400).json({
        error: "Validation failed",
        messages: err.errors,
      })
    }
  }

  validateCreate = async (req, res, next) => {
    const schema = yup.object().shape({
      title: yup
        .string()
        .min(8, "Título deve ter no mínimo 8 caracteres")
        .max(20, "Título deve ter no máximo 20 caracteres")
        .required("Título é obrigatório"),

      text: yup
        .string()
        .required("Texto é obrigatório")
        .test("max-images", "O texto não pode conter mais de 10 imagens", (value) => {
          if (!value) return true
          const imageCount = (value.match(/<img/gi) || []).length
          return imageCount <= 10
        }),

      summary: yup
        .string()
        .min(20, "Resumo deve ter no mínimo 20 caracteres")
        .max(100, "Resumo deve ter no máximo 100 caracteres")
        .required("Resumo é obrigatório"),

      available_at: yup.date().required("Data de publicação é obrigatória"),
    })

    return this.validate(schema, req, res, next)
  }

  validateUpdate = async (req, res, next) => {
    const schema = yup.object().shape({
      title: yup
        .string()
        .min(8, "Título deve ter no mínimo 8 caracteres")
        .max(20, "Título deve ter no máximo 20 caracteres"),

      text: yup.string().test("max-images", "O texto não pode conter mais de 10 imagens", (value) => {
        if (!value) return true
        const imageCount = (value.match(/<img/gi) || []).length
        return imageCount <= 10
      }),

      summary: yup
        .string()
        .min(20, "Resumo deve ter no mínimo 20 caracteres")
        .max(100, "Resumo deve ter no máximo 100 caracteres"),

      available_at: yup.date(),
    })

    return this.validate(schema, req, res, next)
  }
}

module.exports = new PostValidator();