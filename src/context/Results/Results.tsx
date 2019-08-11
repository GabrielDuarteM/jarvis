import React from 'react'
import createContext from '../../helpers/createContext'
import usePluginsContext from '../Plugins'
import resultsReducer, {
  INITIAL_STATE,
  ResultsAction,
  ResultsState,
} from './resultsReducer'
import Result from '../../typings/Results'

interface State extends ResultsState {
  dispatch: React.Dispatch<ResultsAction>
  orderedResult: Result[]
}

const [useResultsContext, ResultsInternalProvider] = createContext<State>()

export const ResultsProvider: React.FC = ({ children }) => {
  const { list: plugins } = usePluginsContext()
  const pluginReducers = plugins.map((x) => x.reducer)
  const [state, dispatch] = React.useReducer(
    resultsReducer(pluginReducers),
    INITIAL_STATE,
  )

  const orderedResult: Result[] = Object.values(state.results).flatMap(
    (value) => value,
  )

  return (
    <ResultsInternalProvider value={{ ...state, orderedResult, dispatch }}>
      {children}
    </ResultsInternalProvider>
  )
}

export default useResultsContext
