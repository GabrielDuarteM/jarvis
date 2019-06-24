import React from 'react'

import { ThemeProvider } from 'styled-components/macro'
import { ElectronProvider } from '../../context/Electron'
import { ResultsProvider } from '../../context/Results'
import dark from '../../themes/dark'

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={dark}>
      <ResultsProvider>
        <ElectronProvider>{children}</ElectronProvider>
      </ResultsProvider>
    </ThemeProvider>
  )
}

export default Providers
