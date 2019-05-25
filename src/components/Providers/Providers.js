import React from 'react'

import { ElectronProvider } from '../../context/Electron/Electron'
import { ResultsProvider } from '../../context/Results/Results'

const Providers = ({ children }) => {
  return (
    <ResultsProvider>
      <ElectronProvider>{children}</ElectronProvider>
    </ResultsProvider>
  )
}

export default Providers
