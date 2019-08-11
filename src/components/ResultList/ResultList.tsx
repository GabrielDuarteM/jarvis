import React from 'react'
import styled from 'styled-components/macro'
import { GetItemPropsOptions } from 'downshift'

import useResultsContext from '../../context/Results'
import Result from '../Result'
import ResultType from '../../typings/Results'

const StyledResults = styled.div`
  margin: 8px 0;
  min-width: 0;
  flex: 0 0 300px;
`

interface Props {
  getItemProps: (options: GetItemPropsOptions<ResultType>) => any
}

const ResultList = React.forwardRef<HTMLDivElement, Props>(
  ({ getItemProps, ...props }, ref) => {
    const { orderedResult, highlighted } = useResultsContext()

    return (
      <StyledResults ref={ref} {...props}>
        {orderedResult.map((result, index) => (
          <Result
            key={index}
            selected={highlighted === index}
            description={result.description}
            {...getItemProps({ item: result })}
          >
            {result.title}
          </Result>
        ))}
      </StyledResults>
    )
  },
)

export default ResultList
