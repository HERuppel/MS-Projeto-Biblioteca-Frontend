import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './global/theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
