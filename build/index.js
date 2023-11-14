"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express_graphql_1 = require("express-graphql");
const path = require("path");
const schema_1 = require("./schema/schema");
const { SERVER_PORT, NODE_ENV } = process.env;
const app = express();
app.get('/api', (req, res) => {
    res.status(200).json({ message: `Server is listening to port: ${SERVER_PORT}` });
});
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true
}));
if (NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
else if (NODE_ENV === 'development') {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Server is running!' });
    });
}
app.listen(SERVER_PORT, () => {
    console.log(`Server is listening to port: ${SERVER_PORT}`);
});
