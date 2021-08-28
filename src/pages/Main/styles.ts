import { Theme, makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%'
    },
    content: {
    },
    toolbar: theme.mixins.toolbar,
    main: {
      width: '100%',
      textAlign: 'center',
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center'
    }
  })
);

export default useStyles;
