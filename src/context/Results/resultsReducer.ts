import React from 'react'
import { ResultsState, ResultsAction } from '../../typings/Results'

export const INITIAL_STATE: ResultsState = {
  searchTerm: '',
  results: {},
  preview: null,
  highlighted: 0,
}

export type PluginReducer<
  CustomState = ResultsState,
  CustomActions = ResultsAction
> = React.Reducer<ResultsState & CustomState, ResultsAction | CustomActions>

const resultsReducer = (pluginReducers: PluginReducer[]) => (
  state: ResultsState,
  action: ResultsAction,
): ResultsState => {
  let newState: ResultsState
  switch (action.type) {
    case 'change-search-term':
      newState = {
        ...state,
        searchTerm: action.payload.searchTerm,
      }
      break
    case 'change-preview':
      newState = {
        ...state,
        preview: action.payload.preview,
      }
      break
    case 'change-highlighted':
      newState = {
        ...state,
        highlighted: action.payload.highlighted,
      }
      break

    default:
      newState = state
      break
  }

  newState = pluginReducers.reduce((prevState, reducer) => {
    return reducer(prevState, action)
  }, newState)

  return newState
}

export default resultsReducer
