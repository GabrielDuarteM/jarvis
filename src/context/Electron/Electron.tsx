import React from 'react'
import { BrowserWindow, AllElectron, Clipboard } from 'electron'
import createContext from '../../helpers/createContext'

const { remote, clipboard }: AllElectron = (window as any).require('electron')

interface State {
  window: BrowserWindow
  clipboard: Clipboard
}

const [useElectronContext, ElectronInternalProvider] = createContext<State>()

export const ElectronProvider: React.FC = ({ children }) => {
  const [window] = React.useState(remote.getCurrentWindow())

  return (
    <ElectronInternalProvider value={{ window, clipboard }}>
      {children}
    </ElectronInternalProvider>
  )
}

export default useElectronContext
