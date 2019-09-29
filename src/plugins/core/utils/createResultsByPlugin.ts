import Result, { ResultsByPlugin } from '../../../typings/Results'

const createResultsByPlugin: (results: Result[]) => ResultsByPlugin = (
  results,
) => ({
  [id]: results,
})

export default createResultsByPlugin
