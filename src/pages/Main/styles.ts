import { Theme, makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      display: 'flex',
      height: '100vh',
      background: '#171717',
    },
    toolbar: theme.mixins.toolbar,
    main: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center'
    }
  })
);

export default useStyles;
