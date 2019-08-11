import React from 'react'
import styled from 'styled-components/macro'
import { GetItemPropsOptions } from 'downshift'

import ResultList from '../ResultList'
import Preview from '../Preview'
import { SIZES } from '../../constants'
import useResultsContext from '../../context/Results'

interface StyledResultsViewProps {
  height: number
}

interface Props {
  getItemProps: (options: GetItemPropsOptions<any>) => any
  highlightedIndex: number
}

const StyledResultsView = styled.div<StyledResultsViewProps>`
  display: flex;
  overflow-y: auto;
  height: ${(props) => props.height}px;
`

const ResultsView: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(
  ({ getItemProps, highlightedIndex, ...props }, ref) => {
    const { searchTerm, dispatch } = useResultsContext()

    React.useEffect(() => {
      dispatch({
        type: 'change-highlighted',
        payload: { highlighted: highlightedIndex },
      })
    }, [dispatch, highlightedIndex])

    return (
      <StyledResultsView
        height={searchTerm ? 500 - SIZES.INPUT.height : 0}
        {...props}
      >
        <ResultList {...props} ref={ref} getItemProps={getItemProps} />
        <Preview />
      </StyledResultsView>
    )
  },
)

export default ResultsView
