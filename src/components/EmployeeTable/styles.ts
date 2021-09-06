import { Theme, createStyles, makeStyles } from '@material-ui/core';

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
      width: '20%',
      background: theme.palette.primary.main,
      color: '#FFF',

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
    swal: {
      zIndex: 10000,
      fontFamily: 'Roboto'
    }
  })
)

export default useStyles;
