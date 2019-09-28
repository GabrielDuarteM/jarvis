import React from 'react'

import Plugin from '../../typings/Plugin'
import Result from '../../typings/Results'
import {
  ResultsAction,
  ResultsState,
} from '../../context/Results/resultsReducer'
import Action from '../../typings/Action'

type ChangeSnippets = Action<'change-snippets', { snippets: Snippet[] }>

type SnippetsActions = ChangeSnippets

interface SnippetState extends ResultsState {
  snippets: Snippet[]
}

interface Props {
  snippets: Snippet[]
  dispatch?: React.Dispatch<ResultsAction | SnippetsActions>
}

const CreateNewSnippet: React.FC<Props> = ({ dispatch, snippets }) => {
  const [name, setName] = React.useState('')
  const [content, setContent] = React.useState('')

  const handleClick = () => {
    if (!snippets.find((snippet) => snippet.name === name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dispatch!({
        type: 'change-snippets',
        payload: {
          snippets: [...snippets, { name, content }],
        },
      })
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  return (
    <div>
      <div>
        <label>
          Name: <input onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Content: <textarea onChange={handleContentChange} />
        </label>
      </div>
      <button type="button" onClick={handleClick}>
        Confirm
      </button>
    </div>
  )
}

interface Snippet {
  name: string
  content: string
}

const ACTIVATION_STRING = 'snip '

const removeActivationString = (search: string) =>
  search.replace(new RegExp(ACTIVATION_STRING), '')

const id = 'snippets'

const mapSnippetToResult = (snip: Snippet): Result => ({
  title: `Text snippet: ${snip.name}`,
  completeTerm: `snip ${snip.name}`,
  description: 'copy the snippet to the clipboard',
  icon: '',
  preview: snip.content,
  onSelect: ({ clipboard }) => {
    clipboard.writeText(snip.content)
  },
})

const getSnippetsResultList = (
  state: SnippetState,
  searchTerm: string,
  newSnippets: Snippet[] = [],
) => {
  if (searchTerm.startsWith(ACTIVATION_STRING)) {
    const search = removeActivationString(searchTerm)
    const foundResults: Result[] = state.snippets
      .filter((snippet) => snippet.name.includes(search))
      .map(mapSnippetToResult)

    const newResults = newSnippets.map(mapSnippetToResult)

    const nextResults = {
      [id]: [
        ...foundResults,
        ...newResults,
        {
          title: `Create new snippet`,
          description: 'Create a new snippet on the right panel',
          completeTerm: 'snip create',
          preview: <CreateNewSnippet snippets={state.snippets} />,
        },
      ],
    }
    return nextResults
  }

  return {
    ...state.results,
    [id]: [],
  }
}

const SnippetPlugin: Plugin<SnippetState, SnippetsActions> = {
  name: 'Snippets',
  id: 'snippets',
  reducer: (state, action) => {
    switch (action.type) {
      case 'change-snippets':
        return {
          ...state,
          results: getSnippetsResultList(
            state,
            state.searchTerm,
            action.payload.snippets,
          ),
          snippets: action.payload.snippets,
        }
      case 'change-search-term':
        return {
          ...state,
          results: getSnippetsResultList(state, action.payload.searchTerm),
        }

      default:
        if (!state.snippets) {
          return { ...state, snippets: [] }
        }

        return state
    }
  },
}

export default SnippetPlugin
