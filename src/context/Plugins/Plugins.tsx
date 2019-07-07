import React from 'react'
import createContext from '../../helpers/createContext'
import Plugin from '../../typings/Plugin'
import SnippetPlugin from '../../plugins/snippet/Snippet'

const MockPlugin: Plugin = {
  name: 'Mock Plugin',
  search: (search) => {
    return search.split('').map((value, index) => ({
      title: `result is ${search} ${index}`,
      completeTerm: search,
      description: `I describe ${search} ${index}`,
      preview: `Hey, I'm a preview for ${search} ${index}`,
    }))
  },
}

interface State {
  list: Plugin[]
}

const [usePluginsContext, PluginsInternalProvider] = createContext<State>()

export const PluginsProvider: React.FC = ({ children }) => {
  const list = [MockPlugin, SnippetPlugin]

  return (
    <PluginsInternalProvider value={{ list }}>
      {children}
    </PluginsInternalProvider>
  )
}

export default usePluginsContext
