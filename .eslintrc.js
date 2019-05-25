const defaultConfig = require('gd-configs/eslint/web')

const config = {
  ...defaultConfig,
  env: {
    ...defaultConfig.env,
    commonjs: true,
    node: true,
  },
}

module.exports = config
