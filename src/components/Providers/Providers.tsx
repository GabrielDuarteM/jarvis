import React from 'react'

import { ThemeProvider } from 'styled-components/macro'
import { ElectronProvider } from '../../context/Electron'
import { ResultsProvider } from '../../context/Results'
import { PluginsProvider } from '../../context/Plugins'
import dark from '../../themes/dark'

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={dark}>
      <PluginsProvider>
        <ResultsProvider>
          <ElectronProvider>{children}</ElectronProvider>
        </ResultsProvider>
      </PluginsProvider>
    </ThemeProvider>
  )
}

export default Providers
