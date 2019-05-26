const config = {
  themeConfig: {
    mode: 'dark',
  },
  modifyBundlerConfig: (bundlerConfig) => {
    bundlerConfig.module.rules.push({
      test: /.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return bundlerConfig
  },
  codeSandbox: false,
  wrapper: 'src/components/StyleguideWrapper',
  menu: ['Readme'],
}

export default config
