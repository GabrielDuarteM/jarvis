import React from 'react'
import { BrowserWindow, AllElectron } from 'electron'
import createContext from '../../helpers/createContext'

const { remote }: AllElectron = (window as any).require('electron')

interface State {
  window: BrowserWindow
}

const [useElectronContext, ElectronInternalProvider] = createContext<State>()

export const ElectronProvider: React.FC = ({ children }) => {
  const [window] = React.useState(remote.getCurrentWindow())

  return (
    <ElectronInternalProvider value={{ window }}>
      {children}
    </ElectronInternalProvider>
  )
}

export default useElectronContext
