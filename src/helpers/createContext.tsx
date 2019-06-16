import React from 'react'

function createContext<State>() {
  const context = React.createContext<State | undefined>(undefined)
  function useContext() {
    const reactContext = React.useContext(context)

    if (!reactContext) {
      throw new Error('useContext must be used inside a Provider with a value')
    }

    return reactContext
  }

  return [useContext, context.Provider] as const
}

export default createContext
