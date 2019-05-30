// # This file initializes each of our root types with a dummy type declaration.
// # Doing this lets us modularize our queries, mutations and subscriptions
// # and extend the root type directly in our entities.

export default `type Query {
  _: Boolean
}

type Mutation {
  _: Boolean
}

 type Subscription {
   _: Boolean
 }`;
