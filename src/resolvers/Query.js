const feed = async (parent, args, context, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      }
    : {};
  return await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });
};

module.exports = {
  feed,
};
