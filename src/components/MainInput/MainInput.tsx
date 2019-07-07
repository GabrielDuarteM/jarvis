import React from 'react'
import styled from 'styled-components/macro'

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

const useFocusOnVisibilityChange = (input: HTMLInputElement | null) => {
  React.useEffect(() => {
    const focusOnVisible = () => {
      if (input && document.visibilityState === 'visible') {
        input.focus()
      }
    }

    document.addEventListener('visibilitychange', focusOnVisible)

    return () =>
      document.removeEventListener('visibilitychange', focusOnVisible)
  }, [input])
}

const MainInput = ({ ...props }) => {
  const inputRef = React.useRef(null)

  useFocusOnVisibilityChange(inputRef.current)

  return <Input ref={inputRef} autoFocus {...props} />
}

export default MainInput
