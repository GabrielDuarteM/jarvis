import {
  PluginReducer,
  ResultsState,
  ResultsAction,
} from '../context/Results/resultsReducer'

interface Plugin<CustomState = ResultsState, CustomActions = ResultsAction> {
  name: string
  id: string
  reducer: PluginReducer<CustomState, CustomActions>
}

export default Plugin
