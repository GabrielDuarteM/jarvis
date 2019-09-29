import { ACTIVATION_STRING } from '../constants'

const removeActivationString = (search: string) =>
  search.replace(new RegExp(ACTIVATION_STRING), '')

export default removeActivationString
