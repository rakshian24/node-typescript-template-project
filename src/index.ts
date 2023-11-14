import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { graphqlHTTP } from "express-graphql";
import * as path from "path";
import { fileURLToPath } from 'url';
import schema from "./schema/schema.ts";

const { SERVER_PORT, NODE_ENV } = process.env;

const app = express();

// Since we are using E6 modules for NodeJS, __dirname will not be present for modules, we need to do some work around as below for making __dirname to work
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api', (req, res) => {
  res.status(200).json({ serverPort: SERVER_PORT, env: NODE_ENV, dirName: __dirname, buildPath: path.resolve(__dirname, 'frontend', 'build') });
});

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

// if (NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// } else if (NODE_ENV === 'development') {
//   app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Server is running!' });
//   });
// }

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening to port: ${SERVER_PORT}`)
})