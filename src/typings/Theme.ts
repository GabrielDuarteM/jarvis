export default interface Theme {
  background: string
  fonts: {
    primary: string
    secondary: string
    disabled: string
  }
  elevation: [
    {
      background: string
      boxShadow: string
    },
    {
      background: string
      boxShadow: string
    },
    {
      background: string
      boxShadow: string
    }
  ]
}
