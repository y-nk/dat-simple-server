import http from 'http'
import middleware from './middleware'

export default (root: string, port: number): http.Server => (
  http.createServer(middleware(root)).listen(port)
)
