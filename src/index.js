import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import { Provider as Auth } from "./Companents/Context/Auth"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth>
        <App/>
      </Auth>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals();
