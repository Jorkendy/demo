const express = require('express')
const path = require('path')
const webpack = require('webpack')
const compression = require('compression')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')
const ip = require('ip')

const app = express()

const webpackConfig = require('../webpack/webpack.dev.js')

const compiler = webpack(webpackConfig)
const middleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  silent: true,
  stats: 'error-only',
  logLevel: 'warn'
})

app.use(compression())
app.use('/static', express.static('static'))
app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) => {
  middleware.fileSystem.readFile(
    path.join(compiler.outputPath, 'index.html'),
    (err, file) => {
      if (err) {
        res.sendStatus(404)
      }

      return res.send(file.toString())
    }
  )
})

const host = 'localhost'
const port = 3000

app.listen(port, host, error => {
  if (error) {
    return console.error(chalk.red(err))
  }
  console.log(`
  ${chalk.gray('\n-----------------------------------')}
  Localhost: ${chalk.green(`http://${host}:${port}`)}
        LAN: ${chalk.green(`http://${ip.address()}:${port}`)}`)
})
