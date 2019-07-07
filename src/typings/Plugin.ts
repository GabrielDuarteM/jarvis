import Result from './Results'

export default interface Plugin {
  name: string
  search: (term: string) => Result[]
  activationString?: string
}

