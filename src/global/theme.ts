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
        body: {
          margin: 0,
          padding: 0
        }
      }
    }
  }
});
