import { ReactNode } from 'react'
import { Clipboard } from 'electron'
import Action from './Action'

interface OnSelectProps {
  clipboard: Clipboard
  dispatch: React.Dispatch<ResultsAction>
}

export default interface Result {
  title: string
  description?: string
  icon?: string
  preview?: React.ReactNode
  completeTerm: string
  onSelect?: (props: OnSelectProps) => void
}

type ChangeSearch = Action<'change-search-term', { searchTerm: string }>
type ChangeResults = Action<'change-results', { results: Result[] }>
type ChangePreview = Action<'change-preview', { preview: React.ReactNode }>
type ChangeHighlighted = Action<'change-highlighted', { highlighted: number }>

export type ResultsAction =
  | ChangeSearch
  | ChangeResults
  | ChangePreview
  | ChangeHighlighted

export type ResultsByPlugin = { [id: string]: Result[] }

export interface ResultsState {
  searchTerm: string
  results: ResultsByPlugin
  preview: ReactNode
  highlighted: number
}
