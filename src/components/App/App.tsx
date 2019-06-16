import React from 'react'

import styled from 'styled-components/macro'
import GlobalStyles from '../GlobalStyles'
import MainInput from '../MainInput'
import ResultsView from '../ResultsView'
import useResultsContext from '../../context/Results'
import useElectronContext from '../../context/Electron'
import { SIZES } from '../../constants'

const StyledApp = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fonts.primary};
  display: flex;
  flex-direction: column;
`

const useResizing = () => {
  const { search } = useResultsContext()
  const { window } = useElectronContext()

  React.useEffect(() => {
    window.setMinimumSize(650, search ? 500 : SIZES.INPUT.height)
  }, [search, window])
}

const App = () => {
  useResizing()

  return (
    <StyledApp>
      <GlobalStyles />
      <MainInput />
      <ResultsView />
    </StyledApp>
  )
}

export default App
