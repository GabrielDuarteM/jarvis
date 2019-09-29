import Result from '../../../typings/Results'
import filterResults from './filterResults'
import { ACTIVATION_STRING } from '../constants'

const commands = {
  install: {
    title: 'jarvis install',
    completeTerm: '',
  },
  inspect: {
    title: 'jarvis inspect',
    completeTerm: '',
  },
  remove: {
    title: 'jarvis remove',
    completeTerm: '',
  },
}

const allResults: Result[] = [
  commands.install,
  commands.inspect,
  commands.remove,
]

describe('filterResults', () => {
  it('should return all results if the search matches exactly the activation string', () => {
    const searchTerm = ACTIVATION_STRING
    const filteredResults = filterResults(allResults, searchTerm)

    expect(filteredResults).toEqual(allResults)
  })

  it('should return just one result if the command matches exactly one of the declared commands', () => {
    const searchTerm = `${ACTIVATION_STRING}install`
    const filteredResults = filterResults(allResults, searchTerm)

    expect(filteredResults).toEqual([commands.install])
  })

  it('should return just one result if the command matches one of the declared commands and theres more options', () => {
    const searchTerm = `${ACTIVATION_STRING}install jarvis-snippets`
    const filteredResults = filterResults(allResults, searchTerm)

    expect(filteredResults).toEqual([commands.install])
  })

  it('should return all commands that contains the searchTerm', () => {
    const searchTerm = `${ACTIVATION_STRING}ins`
    const filteredResults = filterResults(allResults, searchTerm)

    expect(filteredResults).toEqual([commands.install, commands.inspect])
  })
})
