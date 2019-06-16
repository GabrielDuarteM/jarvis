import React from 'react'
import styled from 'styled-components/macro'

import ResultList from '../ResultList'
import Preview from '../Preview'
import { SIZES } from '../../constants'
import useResultsContext from '../../context/Results'

interface StyledResultsViewProps {
  height: number
}

const StyledResultsView = styled.div<StyledResultsViewProps>`
  display: flex;
  overflow-y: auto;
  height: ${(props) => props.height}px;
`

const ResultsView = () => {
  const { search } = useResultsContext()
  return (
    <StyledResultsView height={search ? 500 - SIZES.INPUT.height : 0}>
      <ResultList />
      <Preview />
    </StyledResultsView>
  )
}

export default ResultsView
