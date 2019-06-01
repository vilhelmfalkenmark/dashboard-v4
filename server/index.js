import path from 'path';
import express from 'express';
import mysql from 'mysql';
import { ApolloServer } from 'apollo-server-express';

import schema from './entities/index';

require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
const PORT = process.env.PORT || 4000;

/**
|--------------------------------------------------
| MySQL Connection
|--------------------------------------------------
*/
const dbConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  connectionLimit: 100,
  port: 3306
});

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});

/**
|--------------------------------------------------
| Apollo bootstrap
|--------------------------------------------------
*/
const server = new ApolloServer(schema(dbConnection));

const app = express();

server.applyMiddleware({ app });

/**
|--------------------------------------------------
| Serve build from server
|--------------------------------------------------
*/
app.use(express.static(path.resolve(__dirname, '../build')));

app.get(/^(?!.*(graphql|api)).*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
