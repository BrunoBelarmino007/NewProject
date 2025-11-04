const { Router } = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const PostLikeController = require('./controllers/PostLikeController');
const UserValidator = require('./validators/UserValidator');
const PostValidator = require('./validators/PostValidator');
const authMiddleware = require('./middlewares/auth');


const routes = Router();

// Rotas públicas
routes.post('/user', UserValidator.validateCreateUser, UserController.createUser);
routes.post('/authenticate', UserValidator.validateAuthenticate, UserController.authenticate);
routes.get('/post', PostController.index);

// Rotas protegidas (requerem autenticação)
routes.post('/post', authMiddleware, PostValidator.validateCreate, PostController.createPost);
routes.put('/post/:id', authMiddleware, PostValidator.validateUpdate, PostController.update);
routes.delete('/post/:id', authMiddleware, PostController.delete);
routes.post('/post/:id/like', authMiddleware, PostLikeController.toggle);

module.exports = routes;
