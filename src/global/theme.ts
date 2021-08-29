import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2a623d',
      dark: '#1a472a'
    },
    secondary: {
      main: '#aaaaaa',
      dark: '#5d5d5d',
    },
    common: {
      white: '#FFF',
      black: '#141414'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          margin: 0,
          padding: 0
        },
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }
    }
  }
});
