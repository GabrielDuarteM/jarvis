import React from 'react'

const { remote } = window.require('electron')

const ElectronContext = React.createContext()

const useElectronContext = () => React.useContext(ElectronContext)

export const ElectronProvider = ({ children }) => {
  const [window] = React.useState(remote.getCurrentWindow())
  return (
    <ElectronContext.Provider value={{ window }}>
      {children}
    </ElectronContext.Provider>
  )
}

export default useElectronContext
