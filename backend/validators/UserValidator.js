const yup = require('yup');

class UserValidator {
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

  validateCreateUser = async (req, res, next) => {
    const schema = yup.object().shape({
      name: yup
        .string()
        .min(8, "Nome deve ter no mínimo 8 caracteres")
        .max(30, "Nome deve ter no máximo 30 caracteres")
        .required("Nome é obrigatório"),

      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.(com|br|net|org)$/,
          "Email inválido. Deve ter números, letras ou símbolos antes do @, apenas letras depois do @ e terminar com .com, .br, .net ou .org",
        )
        .required("Email é obrigatório"),

      password: yup
        .string()
        .min(10, "Senha deve ter no mínimo 10 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)",
        )
        .required("Senha é obrigatória"),

      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Senhas não conferem")
        .required("Confirmação de senha é obrigatória"),
    })

    return this.validate(schema, req, res, next)
  }

  validateAuthenticate = async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email("Email inválido").required("Email é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
    })

    return this.validate(schema, req, res, next)
  }
}

module.exports = new UserValidator();