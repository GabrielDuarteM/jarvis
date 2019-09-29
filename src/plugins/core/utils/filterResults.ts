import Result from '../../../typings/Results'
import { ACTIVATION_STRING } from '../constants'

const filterResults = (results: Result[], search: string): Result[] => {
  if (search.trim() === ACTIVATION_STRING.trim()) {
    return results
  }

  return results.filter(
    (result) =>
      result.title.startsWith(search) || search.startsWith(result.title),
  )
}

export default filterResults
