import path from 'path';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import schema from './entities/index';

const PORT = process.env.PORT || 4000;

const server = new ApolloServer(schema());

const app = express();

server.applyMiddleware({ app });

app.use(express.static(path.resolve(__dirname, '../build')));

app.get(/^(?!.*(graphql|api)).*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
