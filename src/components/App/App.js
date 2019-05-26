import React from 'react'

import styled from 'styled-components/macro'
import GlobalStyles from '../GlobalStyles'
import MainInput from '../MainInput'
import ResultList from '../ResultList'

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
      <ResultList />
    </StyledApp>
  )
}

export default App
