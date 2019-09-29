import React from 'react'

import Plugin from '../../typings/Plugin'
import Result, { ResultsState, ResultsAction } from '../../typings/Results'
import Action from '../../typings/Action'

type ChangeSnippets = Action<'add-snippet', { snippet: Snippet }>

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
  const nameRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!snippets.find((snippet) => snippet.name === name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dispatch!({
        type: 'add-snippet',
        payload: {
          snippet: { name, content },
        },
      })
      setName('')
      setContent('')
      if (nameRef.current) {
        nameRef.current.focus()
      }
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
          Name: <input ref={nameRef} value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Content: <textarea value={content} onChange={handleContentChange} />
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
  completeTerm: '',
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
  newSnippet?: Snippet,
) => {
  if (searchTerm.startsWith(ACTIVATION_STRING)) {
    const search = removeActivationString(searchTerm)
    const allSnippets = [...state.snippets, newSnippet].filter(
      Boolean,
    ) as Snippet[]
    const foundResults: Result[] = allSnippets
      .filter((snippet) => snippet.name.includes(search))
      .map(mapSnippetToResult)

    const nextResults = {
      [id]: [
        ...foundResults,
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
      case 'add-snippet': {
        const results = getSnippetsResultList(
          state,
          state.searchTerm,
          action.payload.snippet,
        )
        return {
          ...state,
          results,
          snippets: [...state.snippets, action.payload.snippet],
          highlighted: results.snippets.length - 1,
        }
      }
      case 'change-search-term': {
        const results = getSnippetsResultList(state, action.payload.searchTerm)

        return {
          ...state,
          results,
        }
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
