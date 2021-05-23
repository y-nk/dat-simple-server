import http from 'http'
import middleware from './middleware'

export default (root: string, port: number = 8001, host: string = '0.0.0.0'): http.Server => (
  http.createServer(middleware(root)).listen(port, host, () => {
    console.log('\n', `💥 Dat simple server serving ${root}/ at http://${host}:${port}`, '\n')
  })
)
