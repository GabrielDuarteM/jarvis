import { createGlobalStyle } from 'styled-components/macro'
import 'modern-normalize/modern-normalize.css'
import 'typeface-raleway'
import 'typeface-roboto'

const GlobalStyles = createGlobalStyle`
  html,
  body,
  div#root {
    height: 100%;
    width: 100%;
    font-family: Roboto
  }
`
export default GlobalStyles

