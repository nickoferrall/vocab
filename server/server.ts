import resolvers from './resolvers'
import {PrismaClient} from '@prisma/client'
import {GraphQLServer} from 'graphql-yoga'
import {makeExecutableSchema} from '@graphql-tools/schema'

const typeDefs = `
  type User {
    id          :ID!
    name        :String!
    polls       :[Poll]
  }
  type Poll {
    id          :ID!
    description :String!
    user        :User!
    options     :[Option!]
    votes       :[Vote]
  }
  type Option {
    id          :ID!
    text        :String!
    poll        :Poll!
    votes       :[Vote]
  }
  type Vote {
    id          :ID!
    user        :User!
    poll        :Poll!
    option      :Option!
  }
  type Query {
    users: [User]
    polls: [Poll]
    votes: [Vote]
    user(id: ID!): User
    poll(id: ID!): Poll
  }
  type Mutation {
    createUser(
      name: String!
    ): User
    createPoll(
      description: String!
      id: ID!
      options: [String!]
    ): Poll
    createVote(
      userID: ID!
      pollID: ID!
      optionID: ID!
    ): Vote
  }
`

const prisma = new PrismaClient()
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new GraphQLServer({
  schema,
  context(request) {
    return {
      prisma,
      request
    }
  }
})

export default server
