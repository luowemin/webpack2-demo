var webpack = require('webpack');
var config = require('./webpack.config.js');
//var ora = require('ora')
//var spinner = ora('building for production...')
//spinner.start()
webpack(config, function (err, stats) {
//spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

