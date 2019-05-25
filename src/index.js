import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Providers from './components/Providers'

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root'),
)
