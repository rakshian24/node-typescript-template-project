"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const { SERVER_PORT } = process.env;
const app = express();
app.get('/', (req, res) => {
    res.status(200).json({ message: `Server is listening to port: ${SERVER_PORT}` });
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true
}));
app.listen(SERVER_PORT, () => {
    console.log(`Server is listening to port: ${SERVER_PORT}`);
});
