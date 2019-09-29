import Plugin from '../../typings/Plugin'
import Result, { ResultsByPlugin } from '../../typings/Results'
import { ACTIVATION_STRING, PLUGIN_ID } from './constants'
import filterResults from './utils/filterResults'
import createResultsByPlugin from './utils/createResultsByPlugin'

const CorePlugin: Plugin = {
  name: 'Jarvis core',
  id: PLUGIN_ID,
  reducer: (state, action) => {
    switch (action.type) {
      case 'change-search-term': {
        if (state.searchTerm.startsWith(ACTIVATION_STRING)) {
          const allResults: Result[] = [
            {
              title: 'jarvis install',
              description: 'Install plugins',
              completeTerm: '',
            },
            {
              title: 'jarvis inspect',
              description: 'Inspect plugins',
              completeTerm: '',
            },
            {
              title: 'jarvis remove',
              description: 'Remove plugins',
              completeTerm: '',
            },
          ]

          const filteredResults = filterResults(allResults, state.searchTerm)
          const results: ResultsByPlugin = createResultsByPlugin(
            filteredResults,
          )

          return {
            ...state,
            results,
          }
        }
        return {
          ...state,
          results: {
            ...state.results,
            ...createResultsByPlugin([]),
          },
        }
      }

      default:
        break
    }
    return state
  },
}

export default CorePlugin

