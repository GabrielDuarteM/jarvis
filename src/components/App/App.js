import React from 'react'

import styled from 'styled-components/macro'
import GlobalStyles from '../GlobalStyles'
import MainInput from '../MainInput'

const StyledApp = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fonts.primary};
  display: flex;
  flex-direction: column;
`

const App = () => {
  return (
    <StyledApp>
      <GlobalStyles />
      <MainInput />
    </StyledApp>
  )
}

export default App
