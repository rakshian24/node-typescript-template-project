"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
/* DUMMY DATA */
var TODOS = [{
        id: '1',
        title: 'Morning exercise',
        description: 'Do 1 hour routine morning exercise.',
        ownerId: '1'
    }, {
        id: '2',
        title: 'Grocery shopping',
        description: 'Buy some groceries.',
        ownerId: '1'
    }, {
        id: '3',
        title: 'Job',
        description: 'Attend the 11.30AM meeting today',
        ownerId: '3'
    }, {
        id: '4',
        title: 'Play',
        description: 'Harvest 2 fields today - Farming Simulator 22',
        ownerId: '2'
    }];
var OWNERS = [{
        id: '1',
        name: 'Rakshith',
    }, {
        id: '2',
        name: 'Meghana',
    }, {
        id: '3',
        name: 'Shruthi',
    }, {
        id: '4',
        name: 'Bhuvana',
    }];
var TodoType = new graphql_1.GraphQLObjectType({
    name: "Todo",
    fields: function () { return ({
        id: {
            type: graphql_1.GraphQLString
        },
        title: {
            type: graphql_1.GraphQLString
        },
        description: {
            type: graphql_1.GraphQLString
        },
        owner: {
            type: OwnerType,
            resolve: function (parent, args) {
                return OWNERS.filter(function (owner) { return owner.id === parent.ownerId; })[0];
            }
        }
    }); }
});
var OwnerType = new graphql_1.GraphQLObjectType({
    name: "Owner",
    fields: function () { return ({
        id: {
            type: graphql_1.GraphQLString
        },
        name: {
            type: graphql_1.GraphQLString
        },
        todos: {
            type: new graphql_1.GraphQLList(TodoType),
            resolve: function (parent, args) {
                return TODOS.filter(function (todo) { return todo.ownerId === parent.id; });
            }
        }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        todos: {
            type: new graphql_1.GraphQLList(TodoType),
            resolve: function (parent, args) {
                return TODOS;
            }
        },
        todo: {
            type: TodoType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (parent, args) {
                return TODOS.filter(function (todo) { return todo.id === args.id; })[0];
            }
        },
        owners: {
            type: new graphql_1.GraphQLList(OwnerType),
            resolve: function (parent, args) {
                return OWNERS;
            }
        },
        owner: {
            type: OwnerType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (parent, args) {
                return OWNERS.filter(function (owner) { return owner.id === args.id; })[0];
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
