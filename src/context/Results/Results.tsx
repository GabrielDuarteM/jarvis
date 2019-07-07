import React from 'react'
import createContext from '../../helpers/createContext'
import Result from '../../typings/Results'
import usePluginsContext from '../Plugins'
import Plugin from '../../typings/Plugin'

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>

interface State {
  search: string
  setSearch: SetStateAction<string>
  results: Result[]
  setResults: SetStateAction<Result[]>
  preview: string | undefined
  setPreview: SetStateAction<string | undefined>
  selected: number | undefined
  setSelected: SetStateAction<number | undefined>
}

const [useResultsContext, ResultsInternalProvider] = createContext<State>()

const usePluginSearch = (
  search: string,
  setResults: SetStateAction<Result[]>,
) => {
  const { list } = usePluginsContext()

  React.useEffect(() => {
    const pluginWithActivationString: Plugin | undefined = list.find(
      (plugin) =>
        plugin.activationString && search.startsWith(plugin.activationString),
    )

    if (pluginWithActivationString) {
      const resultsFromPlugins = pluginWithActivationString.search(search)
      setResults(resultsFromPlugins)

      return
    }

    const resultsFromPlugins = list.flatMap((plugin) => {
      if (
        !plugin.activationString ||
        search.startsWith(plugin.activationString)
      ) {
        return plugin.search(search)
      }

      return []
    })

    setResults(resultsFromPlugins)
  }, [list, search, setResults])
}

export const ResultsProvider: React.FC = ({ children }) => {
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<Result[]>([])
  const [preview, setPreview] = React.useState<string>()
  const [selected, setSelected] = React.useState<number>()

  usePluginSearch(search, setResults)

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
        setSelected,
      }}
    >
      {children}
    </ResultsInternalProvider>
  )
}

export default useResultsContext
