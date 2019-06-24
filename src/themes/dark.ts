import Theme from '../typings/Theme'

const dark: Theme = {
  background: '#121212',
  fonts: {
    primary: 'rgba(255,255,255,87%)',
    secondary: 'rgba(255,255,255,60%)',
    disabled: 'rgba(255,255,255,38%)',
  },
  elevation: [
    {
      background: 'rgba(255,255,255,5%)',
      boxShadow:
        '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    },
    {
      background: 'rgba(255,255,255,11%)',
      boxShadow:
        '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)',
    },
    {
      background: 'rgba(255,255,255,16%)',
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    },
  ],
}

export default dark
