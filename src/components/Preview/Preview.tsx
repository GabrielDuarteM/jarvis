import React from 'react'
import styled from 'styled-components/macro'
import useResultsContext from '../../context/Results'

const StyledPreview = styled.div`
  flex: auto;
  padding: 16px;
`

const Preview = () => {
  const { highlighted, orderedResult } = useResultsContext()

  if (
    highlighted === undefined ||
    !orderedResult ||
    !orderedResult[highlighted]
  ) {
    return null
  }

  return <StyledPreview>{orderedResult[highlighted].preview}</StyledPreview>
}

export default Preview
