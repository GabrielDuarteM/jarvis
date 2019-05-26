import React from 'react'

import styled from 'styled-components/macro'
import GlobalStyles from '../GlobalStyles'
import MainInput from '../MainInput'
import ResultList from '../ResultList'
import Preview from '../Preview'

const StyledApp = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fonts.primary};
  display: flex;
  flex-direction: column;
`

const ResultsView = styled.div`
  display: flex;
`

const App = () => {
  return (
    <StyledApp>
      <GlobalStyles />
      <MainInput />
      <ResultsView>
        <ResultList />
        <Preview />
      </ResultsView>
    </StyledApp>
  )
}

export default App
