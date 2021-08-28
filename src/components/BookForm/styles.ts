import { Theme, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '30%',
      height: '75%',
      background: theme.palette.common.white,
      borderRadius: 10,
      textAlign: 'center',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    close: {
      background: 'transparent',
      outline: 'none',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      color: theme.palette.primary.main,
      transition: '200ms',
      height: 40,
      width: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '&:hover': {
        background: '#e5e5e5'
      }
    },
    form: {
      display: 'grid',
      gridTemplateRows: 'repeat(7, 1fr)',
      placeItems: 'center',
      gap: 40,
    },
    formContainer: {
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    input: {
      width: '80%',
      height: 30,
      maxWidth: '600px',
    },
    pageNQtd: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      width: '100%',
      placeItems: 'center'
    },
    button: {
      width: '70%',
      background: theme.palette.primary.dark,
      color: theme.palette.common.white,

      '&:hover': {
        background: theme.palette.primary.main
      }
    }
  })
)

export default useStyles;
