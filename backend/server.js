const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = './proto/hello.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello

function sayHello(call, callback) {
  const name = call.request.name
  callback(null, { message: `Hello ${name}! 👋` })
}

function main() {
  const server = new grpc.Server()

  server.addService(helloProto.HelloService.service, {
    SayHello: sayHello
  })

  server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log('gRPC server running on port 50051')
    }
  )
}

main()
