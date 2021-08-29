import { Theme, makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      background: theme.palette.common.white,
    },
    toolbar: theme.mixins.toolbar,
    main: {
      flexGrow: 1,
      padding: theme.spacing(5)
    }
  })
);

export default useStyles;
