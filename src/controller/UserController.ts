import { Request, Response } from "express";
import User from "../database/schemas/User";

class UserController{

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