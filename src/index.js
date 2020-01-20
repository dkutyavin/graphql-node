const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];
const id = (() => {
  let id = links.length;
  return () => ++id;
})();

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${id()}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log("Server is running on http://localhost:4000"));
