import express from 'express';
import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import Auth from './middlewares/Auth';

const authMiddleware = new Auth();

const routes = express.Router();
const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.post('/users', usersController.create);
// Session
routes.post('/users/auth', usersController.auth)

routes.post('/classes', authMiddleware.auth, classesController.create);
routes.get('/classes', authMiddleware.auth, classesController.index);

routes.post('/connections', authMiddleware.auth, connectionsController.create);
routes.get('/connections', connectionsController.index);



export default routes;