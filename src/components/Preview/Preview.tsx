import React from 'react'
import styled from 'styled-components/macro'
import useResultsContext from '../../context/Results'

const StyledPreview = styled.div`
  flex: auto;
  padding: 16px;
`

const Preview = () => {
  const { highlighted, orderedResult, dispatch } = useResultsContext()

  if (
    highlighted === undefined ||
    !orderedResult ||
    !orderedResult[highlighted]
  ) {
    return null
  }

  const { preview } = orderedResult[highlighted]

  const previewToRender =
    preview &&
    React.Children.map(
      preview as React.ReactElement,
      (child: React.ReactNode) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { dispatch })
          : child,
    )

  return <StyledPreview>{previewToRender}</StyledPreview>
}

export default Preview
