import React from 'react'
import { BrowserWindow, AllElectron } from 'electron'
import getContext from '../getContext'

const { remote }: AllElectron = (window as any).require('electron')

interface State {
  window: BrowserWindow
}

const ElectronContext = React.createContext<State | undefined>(undefined)

const useElectronContext = () => {
  const context = getContext(React.useContext(ElectronContext))

  return context
}

export const ElectronProvider: React.FC = ({ children }) => {
  const [window] = React.useState(remote.getCurrentWindow())

  return (
    <ElectronContext.Provider value={{ window }}>
      {children}
    </ElectronContext.Provider>
  )
}

export default useElectronContext
