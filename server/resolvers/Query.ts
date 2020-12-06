const Query = {
  user: async (parent, args, {prisma}) => {
    const {id} = args
    return prisma.user.findOne({
      where: {
        id
      },
      include: {polls: true}
    })
  },
  users: async (parent, args, {prisma}) => {
    return prisma.user.findMany({
      include: {polls: true}
    })
  },
  poll: async (parent, args, {prisma}) => {
    const {id} = args
    return prisma.poll.findOne({
      where: {
        id
      },
      include: {
        user: true,
        options: true,
        votes: {
          select: {user: true, option: true}
        }
      }
    })
  },
  polls: async (parent, args, {prisma}) => {
    return prisma.poll.findMany({
      include: {
        user: true,
        options: true,
        votes: {
          select: {user: true, option: true}
        }
      }
    })
  }
}

export default Query
