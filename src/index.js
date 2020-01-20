const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");

const resolvers = {
  Query,
  Mutation: {
    post: (root, args, context) =>
      context.prisma.createLink({
        url: args.url,
        description: args.description,
      }),
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log("Server is running on http://localhost:4000"));
