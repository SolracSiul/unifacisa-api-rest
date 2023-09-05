import { Request, Response } from "express";
import User from "../database/schemas/User";

class UserController{
    async DeleteById(request: Request, response: Response) {
        try {
            const userId = request.params.id;

            const user = await User.findById(userId);

            if (!user) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }

            await User.findByIdAndRemove(userId);

            return response.json({
                message: 'Usuário removido com sucesso',
            });
        } catch (error) {
            return response.status(500).json({
                error: 'Alguma coisa deu errado',
                message: error,
            });
        }
    }

    async UpdateById(request: Request, response: Response) {
        try {
            const userId = request.params.id;
            const updatedUserData = request.body;

           
            const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
                new: true, 
            });

            if (!updatedUser) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }

            return response.json(updatedUser);
        } catch (error) {
            return response.status(500).json({
                error: 'Alguma coisa deu errado',
                message: error,
            });
        }
    }

    async SearchById(request: Request, response: Response) {
        try {
            const userId = request.params.id;

            const user = await User.findById(userId);

            if (!user) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }

            return response.json(user);
        } catch (error) {
            return response.status(500).json({
                error: 'Alguma coisa deu errado',
                message: error,
            });
        }
    }
    
    async findAll(request: Request, response: Response){
        try{
            const users = await User.find();
            return response.json(users);

        }catch(error){
            return response.status(500).json({
                error: "Alguma coisa deu errado",
                message: error,
            })
        }
    }

    async create(request: Request, response:Response){
        const {name, email, password} = request.body;
        try {

            const userExists = await User.findOne({email});
            if(userExists){
                return response.status(400).json({
                    error: "Erro",
                    message: "Usuario já existente"
                })
            }
            const user = await User.create({
                name,
                email,
                password
            });
            return response.json(user);
        } catch (error) {
            return response.status(500).send({
                error: "Erro ao cadastrar",
                message: error
            })
        }
    }
}

export default new UserController;