import React from 'react'
import Result from '../../typings/Results'
import Action from '../../typings/Action'

export interface ResultsState {
  searchTerm: string
  results: { [id: string]: Result[] }
  preview: React.ReactNode
  highlighted: number
}

export const INITIAL_STATE: ResultsState = {
  searchTerm: '',
  results: {},
  preview: null,
  highlighted: 0,
}

type ChangeSearch = Action<'change-search-term', { searchTerm: string }>
type ChangeResults = Action<'change-results', { results: Result[] }>
type ChangePreview = Action<'change-preview', { preview: React.ReactNode }>
type ChangeHighlighted = Action<'change-highlighted', { highlighted: number }>

export type ResultsAction =
  | ChangeSearch
  | ChangeResults
  | ChangePreview
  | ChangeHighlighted

export type PluginReducer = React.Reducer<ResultsState, ResultsAction>

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
      throw new Error(`Unhandled type: ${(action as any).type}`)
  }

  newState = pluginReducers.reduce((prevState, reducer) => {
    return reducer(prevState, action)
  }, newState)

  return newState
}

export default resultsReducer
