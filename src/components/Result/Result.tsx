import React from 'react'
import styled, { css } from 'styled-components/macro'

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledResult = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  ${(props) => props.selected && props.theme.elevation[0]};
`

const ItemText = styled.div`
  margin-top: 6px;
  margin-bottom: 6px;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  ${truncate}
`

const Description = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.fonts.secondary};
  ${truncate}
`

interface Props {
  description: string
  selected: boolean
}

const Result: React.FC<Props> = ({ children, description, selected }) => {
  return (
    <StyledResult selected={selected}>
      <ItemText>
        <Title>{children}</Title>
        <Description>{description}</Description>
      </ItemText>
    </StyledResult>
  )
}

export default Result
