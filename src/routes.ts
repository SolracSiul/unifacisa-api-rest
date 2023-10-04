import { Router} from 'express'
import PostController from './controller/PostController';

const routes = Router();

routes.get("/posts", PostController.findAll);
routes.post("/post", PostController.createPost);
routes.delete('/post/:id', PostController.DeleteById); 
// routes.put('/user/:id', UserController.UpdateById);    
// routes.get('/user/:id', UserController.SearchById); 

export default routes;