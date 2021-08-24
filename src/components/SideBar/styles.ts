import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 300,
        flexShrink: 0,
      }
    },
    drawerPaper: { width: 300 },
    header: {
      width: '100%',
      height: 70,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
      color: theme.palette.primary.main
    }
  })
);

export default useStyles;

