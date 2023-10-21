import { Request, Response } from "express"
import User from "../database/schemas/User";
import { BadRequestError, Unauthorized } from "../utils/api-errors";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
require('dotenv').config()

type JwtPayload = {
    id:number
}
class UserController{
    async createUser(request: Request, response:Response){
        const {name, email, password} = request.body;

        const userExist = await User.findOne({email});
        if(userExist){
           throw new BadRequestError('user já existe')
        }
        const hashPassword = await bcrypt.hash(password, 10)

        //is possible use bycript here before create password user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        const responseUser = {
            name: user.name,
            email: user.email,
        };
        
        return response.json(responseUser);
    }
    async findAllUser(request: Request, response: Response){
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
    async loginUser(request: Request, response: Response){
        const {email, password} = request.body

        const user = await User.findOne({email});

        if(!user){
           throw new BadRequestError('E-mail ou senha inválidos')
        }
        const verifyPass = await bcrypt.compare(password, user.password)
        if(!verifyPass){
            throw new BadRequestError('E-mail ou senha inválidos')
        }
       
        const responseUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '',{expiresIn: '3H'}) ;
        return response.json({
            user:responseUser,
            token: token
        })
    }
    async getProfile(request: Request, response: Response){
        try {
            return response.json(request.user)
          
          } catch (error) {
            return response.status(401).json({
                error: "Alguma coisa deu errado",
                message: error,
            })
          }
          


    }

}

export default new UserController