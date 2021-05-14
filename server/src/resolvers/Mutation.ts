const Mutation = {
  createUser: async (_parent, args, {prisma}, _info) => {
    const newUser = await prisma.user.create({
      data: {
        name: args.name
      }
    })
    return newUser
  },
  
  createPoll: async (_parent, args, {prisma}, _info) => {
    const {description, id, options} = args
    const newPoll = await prisma.poll.create({
      data: {
        description,
        user: {
          connect: {id}
        },
        options: {
          create: options.map((option) => ({text: option}))
        }
      }
    })
    return newPoll
  },

  createVote: async (_parent, args, {prisma}, _info) => {
    const {userID, pollID, optionID} = args
    const newVote = await prisma.vote.create({
      data: {
        user: {
          connect: {id: userID}
        },
        poll: {
          connect: {id: pollID}
        },
        option: {
          connect: {id: optionID}
        }
      }
    })
    return newVote
  }
}

export default Mutation
