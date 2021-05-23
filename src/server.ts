import express from 'express'
import { json } from 'body-parser'
import middleware from './middleware'

export default (root: string, port: number = 8001, host: string = '0.0.0.0') => {
  const app = express()
  app.use(json())
  app.use('/', express.static(root))
  app.use('/', middleware(root))

  app.listen(port, host, () => {
    console.log('\n', `💥 Dat simple server serving ${root}/ at http://${host}:${port}`, '\n')
  })

  return app
}
