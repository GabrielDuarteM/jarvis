import React from 'react'

import { ThemeProvider } from 'styled-components/macro'
import { ElectronProvider } from '../../context/Electron/Electron'
import { ResultsProvider } from '../../context/Results/Results'
import theme from '../../themes/dark'

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ResultsProvider>
        <ElectronProvider>{children}</ElectronProvider>
      </ResultsProvider>
    </ThemeProvider>
  )
}

export default Providers
