import React from 'react'
import createContext from '../../helpers/createContext'
import Plugin from '../../typings/Plugin'

const MockPlugin: Plugin = {
  name: 'Mock Plugin',
  search: (search) => {
    return search.split('').map((value, index) => ({
      title: `result is ${search} ${index}`,
      description: `I describe ${search} ${index}`,
      icon: '',
      preview: `Hey, I'm a preview for ${search} ${index}`,
    }))
  },
}

interface State {
  list: Plugin[]
}

const [usePluginsContext, PluginsInternalProvider] = createContext<State>()

export const PluginsProvider: React.FC = ({ children }) => {
  const list = [MockPlugin, MockPlugin]

  return (
    <PluginsInternalProvider value={{ list }}>
      {children}
    </PluginsInternalProvider>
  )
}

export default usePluginsContext
