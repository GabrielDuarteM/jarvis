const getContext = <State>(context: State | undefined) => {
  if (context === undefined) {
    throw new Error(
      'This context cannot be used without being wrapper in a specific Provider.',
    )
  }

  return context
}

export default getContext
