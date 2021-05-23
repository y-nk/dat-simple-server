declare function require(module: string): any;

import { IncomingMessage, ServerResponse } from 'http'
import { runInNewContext } from 'vm'

const payload = (file: string): string => (`
  (async () => {
    const lambda = require('${file}')
    await lambda(req, res)
  })()
`)

export default (path: string, req: IncomingMessage, res: ServerResponse, timeout: number = 30000) => {
  // forbid ../ for path escalation
  const file = path.replace(/\.\.?\//g, '')

  return runInNewContext(
    payload(file), {
      require,
      req, res
    }, { timeout }
  )
}
