// import { view, lensPath } from "ramda";
const TODO_ITEM_MODEL = {
  value: "",
  id: "",
  done: false
};

const TODO_LIST_COLLECTION = "todo_list";

export default ({ connector, endpoints, database, pubsub }) => {
  //////////////////////////////////////////////////
  /**
   * GET ALL TODOS FROM MONGO DB
   */
  //////////////////////////////////////////////////
  const myTodos = () => {
    return new Promise((resolve, reject) => {
      database
        .collection(TODO_LIST_COLLECTION)
        .find({})
        .toArray(function(err, data) {
          if (err) {
            return reject(err);
          } else {
            return resolve(data.sort((a, b) => b.id - a.id));
          }
        });
    });
  };

  //////////////////////////////////////////////////
  /**
   * ADD NEW TODO ITEM TO MONGODB
   */
  //////////////////////////////////////////////////
  const addNewTodo = ({ value, id }) => {
    const newTodo = Object.assign({}, TODO_ITEM_MODEL, {
      value,
      id
    });

    return new Promise((resolve, reject) => {
      database
        .collection(TODO_LIST_COLLECTION)
        .insertOne(newTodo, (err, doc) => {
          if (err) {
            return reject(err);
          }
          return resolve({ value, id, done: false }); // <-- Respond with the original data if succesful
        });
    }).then(data => {
      pubsub.publish("todoChanged", {
        todoChanged: { ...data, action: "TODO_ADDED" }
      });
      return data;
    });
  };

  //////////////////////////////////////////////////
  /**
   * DELETE TODO ITEM FROM MONGODB
   */
  //////////////////////////////////////////////////
  const deleteTodo = ({ id }) => {
    return new Promise((resolve, reject) => {
      database.collection(TODO_LIST_COLLECTION).remove(
        {
          id
        },
        (err, doc) => {
          if (err) {
            return reject(err);
          }
          return resolve({ id }); // <-- Respond with the original data if succesful
        }
      );
    }).then(data => {
      pubsub.publish("todoChanged", {
        todoChanged: { ...data, action: "TODO_DELETED" }
      });
      return data;
    });
  };

  return {
    myTodos,
    addNewTodo,
    deleteTodo
  };
};
