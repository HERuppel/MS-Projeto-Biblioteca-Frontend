import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    container: {
      width: '100%',
      padding: '0 10px 10px 10px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontWeight: 'bold',
    },
    addButton: {
      width: 200,
      height: 40,
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      transition: '200ms',

      '&:hover': {
        background: theme.palette.primary.dark
      }
    },
    box: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 30,

      '& span': {
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
      }
    },
  })
);

export default useStyles;
