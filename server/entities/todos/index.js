import Model from "./model";
import Resolvers from "./resolvers";

export default ({ connector, endpoints, database, pubsub, withFilter }) => {
  const model = Model({ connector, endpoints, database, pubsub });

  return {
    resolvers: Resolvers({ model, pubsub, withFilter }),
    typeDefs: `
    ##### TYPES #####
    type Todo {
      value: String
      id: Float
      done: Boolean
      action: String
    }

    ##### INPUT PARAMS ####

    input newTodoMutation {
      value: String!
      id: Float!
    }
  
    input deleteTodoMutation {
      id: Float!
    }

    ##### QUERY AND MUTATION ####

    extend type Mutation {
      addNewTodo(params: newTodoMutation): Todo
      deleteTodo(params: deleteTodoMutation): Todo
    }

    extend type Subscription {
      todoChanged: Todo
    }

    extend type Query {
      myTodos: [Todo]
    }`
  };
};
