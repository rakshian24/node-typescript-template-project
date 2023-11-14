import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { graphqlHTTP } from "express-graphql";
import * as path from "path";
import schema from "./schema/schema";

const { SERVER_PORT, NODE_ENV } = process.env;

const app = express();

app.get('/api', (req, res) => {
  res.status(200).json({ message: `Server is listening to port: ${SERVER_PORT}` });
});

app.use(express.static(path.resolve(__dirname, '.', 'frontend', 'build')));

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'frontend', 'build', 'index.html'));
  });
} else if (NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
  });
}

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening to port: ${SERVER_PORT}`)
})