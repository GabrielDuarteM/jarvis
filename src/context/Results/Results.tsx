import React from 'react'
import createContext from '../../helpers/createContext'
import Result from '../../typings/Results'
import usePluginsContext from '../Plugins'

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>

interface State {
  search: string
  setSearch: SetStateAction<string>
  results: Result[]
  setResults: SetStateAction<Result[]>
  preview: string | undefined
  setPreview: SetStateAction<string | undefined>
  selected: number | undefined
}

const [useResultsContext, ResultsInternalProvider] = createContext<State>()

export const ResultsProvider: React.FC = ({ children }) => {
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<Result[]>([])
  const [preview, setPreview] = React.useState<string>()
  const [selected, setSelected] = React.useState<number>()

  const { list } = usePluginsContext()

  React.useEffect(() => {
    const resultsFromPlugins = list.flatMap((plugin) => plugin.search(search))

    setResults(resultsFromPlugins)

    if (search.length > 2) {
      setSelected(2)
    } else {
      setSelected(undefined)
    }
  }, [list, search])

  return (
    <ResultsInternalProvider
      value={{
        search,
        setSearch,
        results,
        setResults,
        preview,
        setPreview,
        selected,
      }}
    >
      {children}
    </ResultsInternalProvider>
  )
}

export default useResultsContext
