import React from 'react'
import styled from 'styled-components/macro'
import useResultsContext from '../../context/Results'
import Result from '../Result'

const StyledResults = styled.div`
  margin: 8px 0;
  min-width: 0;
  flex: 0 0 300px;
`

const ResultList = () => {
  const { results, selected } = useResultsContext()

  if (!results || results.length === 0) {
    return null
  }

  return (
    <StyledResults>
      {results.map((result, index) => (
        <Result
          key={index}
          selected={selected === index}
          description={result.description}
        >
          {result.title}
        </Result>
      ))}
    </StyledResults>
  )
}

export default ResultList
