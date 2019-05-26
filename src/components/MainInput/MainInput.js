import React from 'react'
import styled from 'styled-components/macro'
import useResultsContext from '../../context/Results/Results'

const Input = styled.input`
  width: 100%;
  height: 60px;
  border: 0;
  outline: none;
  padding: 0 16px;
  line-height: 60px;
  font-family: Raleway;
  font-size: 26px;
  color: ${(props) => props.theme.fonts.primary};
  ${(props) => props.theme.elevation[2]};
`

const MainInput = () => {
  const { search, setSearch } = useResultsContext()

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />
}

export default MainInput
