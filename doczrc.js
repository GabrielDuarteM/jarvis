import { css } from 'docz-plugin-css'

const config = {
  plugins: [
    css({
      preprocessor: 'postcss',
    }),
  ],
  codeSandbox: false,
  wrapper: 'src/components/StyleguideWrapper',
  menu: ['Readme'],
}

export default config
