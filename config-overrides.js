const {
  override,
  fixBabelImports
} = require('customize-cra')

module.exports = override(
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    style: 'css'
  })
)