import React from 'react'
import createContext from '../../helpers/createContext'

interface Result {
  title: string
  description: string
  icon: string
  preview: string
}

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

  const s: SetStateAction<Result[]> = setResults

  console.log(s)

  React.useEffect(() => {
    setResults(
      search.split('').map((value, index) => ({
        title: `${search} ${index}`,
        description: `I describe ${search} ${index}`,
        icon: '',
        preview: `Hey, I'm a preview for ${search} ${index}`,
      })),
    )

    if (search.length > 2) {
      setSelected(2)
    } else {
      setSelected(undefined)
    }
  }, [search])

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
