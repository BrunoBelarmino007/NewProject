  require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST', 
    dialect: 'postgres',
    define: {
      underscored: true,
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres',
    define: {
      underscored: true,
    }
  }
};