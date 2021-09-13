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
      padding: '0 10px 10px 10px',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontWeight: 'bold',
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
    swal: {
      zIndex: 10000,
      fontFamily: 'Roboto'
    }
  })
);

export default useStyles;
