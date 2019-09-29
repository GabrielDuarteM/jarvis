import { PluginReducer } from '../context/Results/resultsReducer'
import { ResultsState, ResultsAction } from './Results'

interface Plugin<CustomState = ResultsState, CustomActions = ResultsAction> {
  name: string
  id: string
  reducer: PluginReducer<CustomState, CustomActions>
}

export default Plugin
