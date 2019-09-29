// import React from 'react'

import Plugin from '../../typings/Plugin'
import { ResultsByPlugin } from '../../typings/Results'

const ACTIVATION_STRING = 'jarvis '

// const removeActivationString = (search: string) =>
//   search.replace(new RegExp(ACTIVATION_STRING), '')

const id = 'core'

const CorePlugin: Plugin = {
  name: 'Jarvis core',
  id,
  reducer: (state, action) => {
    switch (action.type) {
      case 'change-search-term': {
        if (state.searchTerm.startsWith(ACTIVATION_STRING)) {
          const results: ResultsByPlugin = {
            [id]: [
              {
                title: 'jarvis install',
                description: 'Install plugins',
                completeTerm: '',
              },
              {
                title: 'jarvis remove',
                description: 'Remove plugins',
                completeTerm: '',
              },
            ],
          }
          return {
            ...state,
            results,
          }
        }
        break
      }

      default:
        break
    }
    return state
  },
}

export default CorePlugin

