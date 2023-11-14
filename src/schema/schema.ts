import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

/* DUMMY DATA */
const TODOS = [{
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

const OWNERS = [{
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
}]

const TodoType: GraphQLObjectType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        return OWNERS.filter(owner => owner.id === parent.ownerId)[0];
      }
    }
  })
});

const OwnerType: GraphQLObjectType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return TODOS.filter(todo => todo.ownerId === parent.id)
      }
    }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return TODOS.filter(todo => todo.id === args.id)[0];
      }
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return OWNERS.filter(owner => owner.id === args.id)[0];
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});