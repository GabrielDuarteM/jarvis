import React from 'react'
import styled from 'styled-components/macro'
import useResultsContext from '../../context/Results/Results'

const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  padding: 0 10px;
  line-height: 60px;
  height: 100%;
  font-family: Raleway;
  font-size: 26px;
`

const MainInput = () => {
  const { search, setSearch } = useResultsContext()

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />
}

export default MainInput
