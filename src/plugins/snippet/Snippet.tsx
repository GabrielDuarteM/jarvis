import React from 'react'
import Plugin from '../../typings/Plugin'
import Result from '../../typings/Results'

interface Props {
  onSubmit: (snippet: Snippet) => void
}

const CreateNewSnippet: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = React.useState('')
  const [content, setContent] = React.useState('')

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

const snippets: Snippet[] = []

const ACTIVATION_STRING = 'snip '

const removeActivationString = (search: string) =>
  search.replace(new RegExp(ACTIVATION_STRING), '')

const id = 'snippets'

const SnippetPlugin: Plugin = {
  name: 'Snippets',
  id: 'snippets',
  reducer: (state, action) => {
    if (action.type === 'change-search-term') {
      if (action.payload.searchTerm.startsWith(ACTIVATION_STRING)) {
        const search = removeActivationString(action.payload.searchTerm)
        const foundResults: Result[] = snippets
          .filter((snippet) => snippet.name.includes(search))
          .map((snip) => ({
            title: `Text snippet: ${snip.name}`,
            completeTerm: `snip ${snip.name}`,
            description: 'copy the snippet to the clipboard',
            icon: '',
            preview: snip.content,
            onSelect: ({ clipboard }) => {
              clipboard.writeText(snip.content)
            },
          }))

        return {
          ...state,
          results: {
            [id]: [
              ...foundResults,
              {
                title: `Create new snippet`,
                description: 'Create a new snippet on the right panel',
                completeTerm: 'snip create',
                preview: (
                  <CreateNewSnippet
                    onSubmit={(snippet: Snippet) => {
                      if (!snippets.find((x) => x.name === snippet.name)) {
                        snippets.push(snippet)
                      }
                    }}
                  />
                ),
              },
            ],
          },
        }
      }

      return {
        ...state,
        results: {
          ...state.results,
          [id]: [],
        },
      }
    }

    return state
  },
}

export default SnippetPlugin

