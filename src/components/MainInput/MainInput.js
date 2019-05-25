import React from 'react'
import styled from 'styled-components/macro'
import useElectronContext from '../../context/Electron'

const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  padding: 0 10px;
  line-height: 60px;
  height: 100%;
  font-family: Raleway;
`

const useSetSize = (width, height, ms) => {
  const { window } = useElectronContext()
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      window.setMinimumSize(width, height)
    }, ms)

    return () => clearTimeout(timeout)
  }, [window, ms, width, height])
}

const MainInput = () => {
  useSetSize(650, 200, 3000)
  useSetSize(650, 65, 6000)

  return <Input />
}

export default MainInput
