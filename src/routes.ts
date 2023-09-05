import { Router} from 'express'
import UserController from './controller/UserController';

const routes = Router();

routes.get("/users", UserController.findAll);
routes.post("/user", UserController.create);
routes.delete('/user/:id', UserController.DeleteById); 
routes.put('/user/:id', UserController.UpdateById);    
routes.get('/user/:id', UserController.SearchById); 

export default routes;