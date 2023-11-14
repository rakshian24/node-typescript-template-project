import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

const { SERVER_PORT } = process.env;

const app = express();
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening to port: ${SERVER_PORT}`)
})