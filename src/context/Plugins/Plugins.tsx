import React from 'react'
import createContext from '../../helpers/createContext'
import Plugin from '../../typings/Plugin'

const MockPlugin: Plugin = {
  name: 'Mock Plugin',
  search: (search) => {
    return search.split('').map((value, index) => ({
      title: `result is ${search} ${index}`,
      completeTerm: search,
      description: `I describe ${search} ${index}`,
      icon: '',
      preview: `Hey, I'm a preview for ${search} ${index}`,
    }))
  },
}

const SnippetPlugin: Plugin = {
  name: 'Snippets',
  activationString: 'snip ',
  search: (search) => {
    const snippets = ['address', 'phone']

    return snippets.map((snip) => ({
      title: `Text snippet: ${snip}`,
      completeTerm: `snip ${snip}`,
      description: 'copy the snippet to the clipboard',
      icon: '',
      preview: '',
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
