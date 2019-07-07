import React from 'react'
import Plugin from '../../typings/Plugin'
import Result from '../../typings/Results'

interface Props {
  onSubmit: (snippet: Snippet) => void
}

const CreateNewSnippet: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = React.useState('')
  const [content, setContent] = React.useState('')

  return (
    <div>
      <div>
        <label>
          Name: <input onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Content: <textarea onChange={(e) => setContent(e.target.value)} />
        </label>
      </div>
      <button type="button" onClick={() => onSubmit({ name, content })}>
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

const SnippetPlugin: Plugin = {
  name: 'Snippets',
  activationString: ACTIVATION_STRING,
  search: (searchWithActivationString) => {
    const search = removeActivationString(searchWithActivationString)
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

    return [
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
    ]
  },
}

export default SnippetPlugin

