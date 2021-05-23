# dat simple server

_Do you remember the time you'd drop a .php file into a ftp folder, and instantly, it was deployed?_

**Well, welcome to that again :)**
## Getting started

You can run the server quickly with `npx dat-simple-server`.

Here are the command line options:

- `--public=./www`: The public folder to serve
- `--port=8001`: The port for your server
- `--host=0.0.0.0`: The host for your server

When running with default options, you'll end up with a server running on `http://0.0.0.0:8001` which will be serving javascript files under `./www` similarly to lambdas.

A minimal example for a file to serve is:

```
module.exports = async (req, res) => {
  res.end('hello world')
}
```

You don't need to re-run the server. Just make an other request (refresh your browser?) and you should be good to go.

## Going further

You can have this server running in a monitored environment with [pm2](https://pm2.keymetrics.io/) and its `www/` folder exposed as part of an (s)ftp server, while handling service as an upstream with nginx.

Doing so, the experience should be pretty similar to _"php-fpm + drag&drop php file to my ftp"_ deployment process.

## Importing in an application

The middleware responsible for loading the script is compatible with express and similar _(req, res)_ libraries. You can reuse it easily:

```
const { middleware } = require('dat-simple-server')
express.use('/', middlewware(`${process.cwd()}/www`, 30000))
```
