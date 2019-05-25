import React from 'react'

import { ElectronProvider } from '../../context/Electron/Electron'

const Providers = ({ children }) => {
  return <ElectronProvider>{children}</ElectronProvider>
}

export default Providers
