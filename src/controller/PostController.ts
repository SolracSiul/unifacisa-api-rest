import { Request, Response } from "express";
import Post from "../database/schemas/Post";

class PostController{
    async DeleteById(request: Request, response: Response) {
        try {
            const postId = request.params.id;

            const post = await Post.findById(postId);

            if (!post) {
                return response.status(404).json({
                    error: 'Usuário não encontrado',
                });
            }

            await Post.findByIdAndRemove(postId);

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

    // async UpdateById(request: Request, response: Response) {
    //     try {
    //         const userId = request.params.id;
    //         const updatedUserData = request.body;

           
    //         const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    //             new: true, 
    //         });

    //         if (!updatedUser) {
    //             return response.status(404).json({
    //                 error: 'Usuário não encontrado',
    //             });
    //         }

    //         return response.json(updatedUser);
    //     } catch (error) {
    //         return response.status(500).json({
    //             error: 'Alguma coisa deu errado',
    //             message: error,
    //         });
    //     }
    // }

    // async SearchById(request: Request, response: Response) {
    //     try {
    //         const userId = request.params.id;

    //         const user = await User.findById(userId);

    //         if (!user) {
    //             return response.status(404).json({
    //                 error: 'Usuário não encontrado',
    //             });
    //         }

    //         return response.json(user);
    //     } catch (error) {
    //         return response.status(500).json({
    //             error: 'Alguma coisa deu errado',
    //             message: error,
    //         });
    //     }
    // }
    
    async findAll(request: Request, response: Response){
        try{
            const posts = await Post.find();
            return response.json(posts);

        }catch(error){
            return response.status(500).json({
                error: "Alguma coisa deu errado",
                message: error,
            })
        }
    }

    async createPost(request: Request, response:Response){
        const {author, content} = request.body;
        try {

            const postExist = await Post.findOne({content});
            if(postExist){
                return response.status(400).json({
                    error: "Erro",
                    message: "Post já existente"
                })
            }
            const post = await Post.create({
                author,
                content,
               
            });
            return response.json(post);
        } catch (error) {
            return response.status(500).send({
                error: "Erro ao cadastrar",
                message: error
            })
        }
    }
}

export default new PostController;