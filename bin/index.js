const server = require('../lib/server')

const argv = require('yargs').argv

const root = argv.public ?? `${__dirname}/www`
const port = argv.port ?? 8001

server(root, port)
