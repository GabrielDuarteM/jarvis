import React from 'react'
import createContext from '../../helpers/createContext'
import Plugin from '../../typings/Plugin'
import SnippetPlugin from '../../plugins/snippet/Snippet'

const id = 'mock-plugin'

const MockPlugin: Plugin = {
  name: 'Mock Plugin',
  id,
  reducer: (state, action) => {
    if (action.type === 'change-search-term') {
      const { searchTerm } = action.payload

      return {
        ...state,
        results: {
          ...state.results,
          [id]: [
            ...searchTerm.split('').map((_value, index) => ({
              title: `result is ${searchTerm} ${index}`,
              completeTerm: searchTerm,
              description: `I describe ${searchTerm} ${index}`,
              preview: `Hey, I'm a preview for ${searchTerm} ${index}`,
            })),
          ],
        },
      }
    }

    return state
  },
}

interface State {
  list: Plugin[]
}

const [usePluginsContext, PluginsInternalProvider] = createContext<State>()

export const PluginsProvider: React.FC = ({ children }) => {
  const list: Plugin[] = [MockPlugin, SnippetPlugin]

  return (
    <PluginsInternalProvider value={{ list }}>
      {children}
    </PluginsInternalProvider>
  )
}

export default usePluginsContext
