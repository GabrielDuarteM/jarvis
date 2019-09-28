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
  const { searchTerm } = useResultsContext()
  const { window } = useElectronContext()

  React.useEffect(() => {
    window.setMinimumSize(650, searchTerm ? 500 : SIZES.INPUT.height)
    window.setSize(650, searchTerm ? 500 : SIZES.INPUT.height)
  }, [searchTerm, window])
}

const App = () => {
  useResizing()
  const { clipboard } = useElectronContext()

  const { dispatch } = useResultsContext()

  return (
    <StyledApp>
      <GlobalStyles />

      <Downshift
        itemToString={(result: Result) => result && result.completeTerm}
        onInputValueChange={(value) =>
          dispatch({
            type: 'change-search-term',
            payload: { searchTerm: value || '' },
          })
        }
        isOpen
        defaultHighlightedIndex={0}
        onSelect={(item: Result) => {
          if (item && item.onSelect) {
            item.onSelect({ clipboard })
          }
        }}
        stateReducer={(state, changes) => {
          if (changes.type === Downshift.stateChangeTypes.blurInput) {
            return {} // no-changes
          }
          return changes
        }}
        initialInputValue=""
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
