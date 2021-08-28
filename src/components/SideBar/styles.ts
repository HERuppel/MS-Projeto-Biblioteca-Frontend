import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 250,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: 250,
      backgroundColor: theme.palette.primary.dark
    },

    header: {
      width: '100%',
      height: 70,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#E5e5e5'
    },
    itemText: {
      fontWeight: theme.typography.fontWeightBold,
    },
    navLink: {
      textDecoration: 'none',
      color: theme.palette.common.white,
      gap: 50,
      transition: '300ms',

      '&:hover': {
        background: theme.palette.primary.main,
      }
    },
    activeNavLink: {
      background: theme.palette.primary.main
    }
  })
);

export default useStyles;

