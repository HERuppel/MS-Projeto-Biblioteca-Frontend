import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 300,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: 300,
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
      fontWeight: theme.typography.fontWeightBold
    },
    navLink: {
      textDecoration: 'none',
      color: '#202020',
      gap: 70
    },
    activeNavLink: {
      color: theme.palette.common.white
    }
  })
);

export default useStyles;

