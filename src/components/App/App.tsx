import React from 'react'

import styled from 'styled-components/macro'
import Downshift, { DownshiftState, StateChangeOptions } from 'downshift'
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

type StateReducer = (
  state: DownshiftState<Result>,
  changes: StateChangeOptions<Result>,
) => Partial<StateChangeOptions<Result>>

const App = () => {
  useResizing()
  const { clipboard } = useElectronContext()

  const { dispatch } = useResultsContext()

  const stateReducer: StateReducer = (_state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.blurInput:
        return {} // no-changes

      default:
        return changes
    }
  }

  const itemToString = (result: Result) => result && result.completeTerm

  const onInputValueChange = (value: string) =>
    dispatch({
      type: 'change-search-term',
      payload: { searchTerm: value || '' },
    })

  const onSelect = (item: Result) => {
    if (item && item.onSelect) {
      item.onSelect({ clipboard, dispatch })
    }
  }

  return (
    <StyledApp>
      <GlobalStyles />

      <Downshift
        itemToString={itemToString}
        onInputValueChange={onInputValueChange}
        isOpen
        defaultHighlightedIndex={0}
        onSelect={onSelect}
        stateReducer={stateReducer}
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
