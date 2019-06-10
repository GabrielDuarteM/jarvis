import { createGlobalStyle } from 'styled-components/macro'
import 'modern-normalize/modern-normalize.css'
import 'typeface-raleway'
import 'typeface-roboto'

const GlobalStyles = createGlobalStyle`
  html,
  body,
  div#root {
    background: #121212;
    color: rgba(255,255,255,87%);
    height: 100%;
    width: 100%;
    font-family: Roboto
  }
`
export default GlobalStyles

