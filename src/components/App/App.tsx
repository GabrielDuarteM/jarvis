import React from 'react'

import styled from 'styled-components/macro'
import Downshift from 'downshift'
import GlobalStyles from '../GlobalStyles'
import MainInput from '../MainInput'
import ResultsView from '../ResultsView'
import useResultsContext from '../../context/Results'
import useElectronContext from '../../context/Electron'
import { SIZES } from '../../constants'
import Result from '../../typings/Results'

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
  const { clipboard } = useElectronContext()

  const { setSearch } = useResultsContext()
  return (
    <StyledApp>
      <GlobalStyles />

      <Downshift
        itemToString={(result: Result) => result && result.completeTerm}
        onInputValueChange={(value) => setSearch(value || '')}
        defaultHighlightedIndex={0}
        onSelect={(item: Result) => {
          if (item.onSelect) {
            item.onSelect({ clipboard })
          }
        }}
      >
        {({ getInputProps, getItemProps, getMenuProps, highlightedIndex }) => {
          const inputProps = getInputProps()
          const menuProps = getMenuProps()

          return (
            <div>
              <MainInput {...inputProps} />
              <ResultsView
                highlightedIndex={highlightedIndex}
                {...menuProps}
                getItemProps={getItemProps}
              />
            </div>
          )
        }}
      </Downshift>
    </StyledApp>
  )
}

export default App
