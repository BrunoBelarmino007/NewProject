const { Router } = require('express');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const PostLikeController = require('./controllers/PostLikeController');
const UserValidator = require('./validators/UserValidator');
const PostValidator = require('./validators/PostValidator');
const authMiddleware = require('./middlewares/auth');


const routes = Router();

// Rotas públicas
routes.post('/user', UserValidator.store, UserController.store);
routes.post('/authenticate', UserValidator.authenticate, UserController.authenticate);
routes.get('/post', PostController.index);

// Rotas protegidas (requerem autenticação)
routes.post('/post', authMiddleware, PostValidator.store, PostController.store);
routes.put('/post/:id', authMiddleware, PostValidator.update, PostController.update);
routes.delete('/post/:id', authMiddleware, PostController.delete);
routes.post('/post/:id/like', authMiddleware, PostLikeController.toggle);

module.exports = routes;
