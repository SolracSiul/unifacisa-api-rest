import { Router} from 'express'
import PostController from './controller/PostController';
import UserController from './controller/UserController';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

routes.get("/posts", PostController.findAll);
routes.post("/post", PostController.createPost);
routes.delete("/post/:id", PostController.DeleteById); 

//ou use routes.use(authMiddleware) e terá autenticação em todas rotas abaixo.

routes.post("/user", UserController.createUser);
routes.get("/users", UserController.findAllUser);
routes.get("/profile", authMiddleware,  UserController.getProfile);
routes.post("/login", UserController.loginUser);
// routes.put('/user/:id', UserController.UpdateById);    
// routes.get('/user/:id', UserController.SearchById); 

export default routes;