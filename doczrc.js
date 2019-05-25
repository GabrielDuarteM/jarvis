import { css } from 'docz-plugin-css'

const config = {
  plugins: [
    css({
      preprocessor: 'postcss',
    }),
  ],
  wrapper: 'src/components/StyleguideWrapper',
}

export default config
