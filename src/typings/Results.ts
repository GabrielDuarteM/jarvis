import React from 'react'
import { Clipboard } from 'electron'

interface OnSelectProps {
  clipboard: Clipboard
}

export default interface Result {
  title: string
  description?: string
  icon?: string
  preview?: React.ReactNode
  completeTerm: string
  onSelect?: (props: OnSelectProps) => void
}
