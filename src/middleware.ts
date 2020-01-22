import { RequestListener, IncomingMessage, ServerResponse } from 'http'
import thread from './thread'

export default (root: string, timeout = 30000): RequestListener => (req: IncomingMessage, res: ServerResponse) => {
  try {
    const [path] = req.url!.split('?')
    thread(`${root}${path}`, req, res, timeout)
  }
  catch(error) {
    switch(error.code) {
      case 'MODULE_NOT_FOUND':
        res.statusCode = 404
        res.end(`Not Found - ${error}`)
        break

      default:
        res.statusCode = 500
        res.end(`Server Error - ${error}`)
        break
    }
  }
}
