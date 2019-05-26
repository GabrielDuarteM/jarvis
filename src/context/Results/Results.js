import React from 'react'

const ResultsContext = React.createContext()

const useResultsContext = () => React.useContext(ResultsContext)

export const ResultsProvider = ({ children }) => {
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState()
  const [preview, setPreview] = React.useState()
  const [selected, setSelected] = React.useState()

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
      setSelected()
    }
  }, [search])

  return (
    <ResultsContext.Provider
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
    </ResultsContext.Provider>
  )
}

export default useResultsContext
