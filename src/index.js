"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
var express_graphql_1 = require("express-graphql");
var schema_1 = require("./schema/schema");
var SERVER_PORT = process.env.SERVER_PORT;
var app = express();
app.get('/', function (req, res) {
    res.status(200).json({ message: "Server is listening to port: ".concat(SERVER_PORT) });
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true
}));
app.listen(SERVER_PORT, function () {
    console.log("Server is listening to port: ".concat(SERVER_PORT));
});
