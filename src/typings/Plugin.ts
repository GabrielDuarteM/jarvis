import { PluginReducer } from '../context/Results/resultsReducer'

export default interface Plugin {
  name: string
  id: string
  reducer: PluginReducer
}
