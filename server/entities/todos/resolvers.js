export default ({ model, pubsub, withFilter }) => ({
  Query: {
    myTodos: context => model.myTodos()
  },
  Mutation: {
    /**
     * @function addNewTodo
     */
    addNewTodo: (context, { params: { value, id } }) =>
      model.addNewTodo({ value, id }),
    /**
     * @function deleteTodo
     */
    deleteTodo: (context, { params: { id } }) => model.deleteTodo({ id })
  },
  Subscription: {
    /**
     * @function todoChanged
     */
    todoChanged: {
      /**
       * @function withFilter makes a distinction to which clients should
       * receive the websocket broadcast
       * @param {Object} payload The response from the api-request passed from the pubsub method
       * @param {Object} variables The variables passed from the client
       * @param {Object} context The context of the currentUser from the socket-authentication file
       * @returns {boolean}
       */
      // subscribe: () =>
      //   console.log("körs") || pubsub.asyncIterator("todoChanged")
      subscribe: withFilter(
        () => pubsub.asyncIterator("todoChanged"),
        (payload, variables, context) => true
        // console.log(payload, " payload", variables, " variable") || true
      )
    }
  }
});
