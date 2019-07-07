import React from 'react'
import styled from 'styled-components/macro'
import useResultsContext from '../../context/Results'

const StyledPreview = styled.div`
  flex: auto;
  padding: 16px;
`

const Preview = () => {
  const { selected, results } = useResultsContext()

  if (selected === undefined || !results || !results[selected]) {
    return null
  }

  return <StyledPreview>{results[selected].preview}</StyledPreview>
}

export default Preview
