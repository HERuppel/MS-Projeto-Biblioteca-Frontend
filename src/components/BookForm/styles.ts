import { Theme, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '40%',
      height: '80%',
      background: theme.palette.common.white,
      borderRadius: 10,
      textAlign: 'center'
    },
    form: {
      display: 'grid',
      gridTemplateRows: 'repeat(7, 1fr)',
      placeItems: 'center',
      gap: 20
    },
    input: {
      width: '80%',
      height: 30,
      maxWidth: '600px',
    },
    pageNQtd: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20
    },
    button: {
      width: '80%',
      alignSelf: 'flex-end',
      background: theme.palette.primary.dark,
      color: theme.palette.common.white,

      '&:hover': {
        background: theme.palette.primary.main
      }
    }
  })
)

export default useStyles;
