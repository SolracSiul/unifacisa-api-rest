import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import routes from './routes';
import customServer from './graphql/graphqlServer';
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost/apipost', {})
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB: ' + error);
  });

async function startApolloServer() {
    await customServer.start();
    customServer.applyMiddleware({ app });
  }

startApolloServer();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});