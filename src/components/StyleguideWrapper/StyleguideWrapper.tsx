import React from 'react'

import Providers from '../Providers'
import GlobalStyles from '../GlobalStyles'

const StyleguideWrapper: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Providers>{children}</Providers>
    </>
  )
}

export default StyleguideWrapper
