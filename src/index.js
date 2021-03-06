const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  Vote,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
});

const PORT = 5000;

server.start({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
