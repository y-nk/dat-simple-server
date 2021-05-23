declare function require(module: string): any;

import { join } from 'path'
import { RequestListener, IncomingMessage, ServerResponse } from 'http'
import { runInNewContext } from 'vm'

const payload = (file: string): string => (`
  (async () => {
    try {
      const lambda = require('${file}')
      await lambda(req, res)
    } catch (error) {
      switch(error.code) {
        case 'MODULE_NOT_FOUND':
          res.statusCode = 404
          res.end('Not Found' + ' --- ' + error.toString())
          break

        default:
          res.statusCode = 500
          res.end('Server error' + ' --- ' + error.toString())
          break
      }
    }
  })()
`)

export default (root: string, timeout = 30000): RequestListener => (req: IncomingMessage, res: ServerResponse) => {
  const [path] = req.url!.split('?')

  // forbid ../ for path escalation
  const file = join(root, path.replace(/\.\.?\//g, ''))

  return runInNewContext(
    payload(file), {
      require,
      req, res
    }, { timeout }
  )
}
