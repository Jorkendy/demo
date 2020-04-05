import React from 'react'
import { render } from 'react-dom'
import { CacheProvider } from '@emotion/core'
import { cache } from 'emotion'
import { BrowserRouter as Router } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.scss'

import('./App').then(({ default: App }) => {
  render(
    <CacheProvider value={cache}>
      <Router>
        <App />
      </Router>
    </CacheProvider>,
    document.querySelector('#root')
  )
})
