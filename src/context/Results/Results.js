import React from 'react'

const ResultsContext = React.createContext()

const useResultsContext = () => React.useContext(ResultsContext)

export const ResultsProvider = ({ children }) => {
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState()
  const [preview, setPreview] = React.useState()

  React.useEffect(() => {
    setResults(
      search.split('').map((result) => ({
        title: result,
        preview: `Hey, I'm a preview for ${result}`,
      })),
    )
  }, [search])

  return (
    <ResultsContext.Provider
      value={{ search, setSearch, results, setResults, preview, setPreview }}
    >
      {children}
    </ResultsContext.Provider>
  )
}

export default useResultsContext
