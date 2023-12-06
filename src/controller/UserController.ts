import { Request, Response } from "express"
import { NextFunction } from "express";
import User from "../database/schemas/User";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
require('dotenv').config()

type JwtPayload = {
    id:number
}
class UserController{
    async createUser(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password, profissao, image } = request.body;
    
            const userExist = await User.findOne({ email });
            if (userExist) {
                console.log('temos erro mas o codigigo continua')
                return response.status(400).json({ error: 'Usuário já existe' });
            }
    
            const hashPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({
                name,
                email,
                password: hashPassword,
                profissao,
                image
            });
    
            const responseUser = {
                name: user.name,
                email: user.email,
                profissao: user.profissao,
                image: user.image,
            };
    
            return response.json(responseUser);
        } catch (error) {
            next(error);
        }
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
        try{
            const {email, password} = request.body
            
            const user = await User.findOne({email});
    
            if(!user){
                throw new Error('E-mail ou senha invalidos')
            }
            const verifyPass = await bcrypt.compare(password, user.password);
            if(!verifyPass){
                throw new Error('E-mail ou senha invalidos')
            }
            const responseUser ={
                id: user.id,
                name: user.name,
                email: user.email,
                profissao: user.profissao,
                image: user.image
            }
            const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '',{expiresIn: '3H'});
            return response.json({
                user: responseUser,
                token: token
            });
        }catch(error){
            return response.status(404).json({
                error: "E-mail ou senha invalidos",
                message: error,})
        }

      
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