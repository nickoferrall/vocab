import server from './server'

const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}
server.start(options, ({port}) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
