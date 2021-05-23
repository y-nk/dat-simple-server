# dat simple server

_Do you remember the time you'd drop a .php file into a ftp folder, and instantly, it was deployed?_

**Well, welcome to that again :)**
## Getting started

You can run the server quickly with `npx dat-simple-server`.

Here are the command line options:

- `--public=./www`: The public folder to serve
- `--port=8001`: The port for your server
- `--host=0.0.0.0`: The host for your server

## Importing in an application

The middleware responsible for loading the script is compatible with express and similar _(req, res)_ libraries. You can reuse it easily:

```
const { middleware } = require('dat-simple-server')
express.use('/', middlewware(`${process.cwd()}/www`, 30000))
```
