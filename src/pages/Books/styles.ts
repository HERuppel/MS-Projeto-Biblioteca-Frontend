import { Theme, makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    content: {
      display: 'flex',
      justifyContent: 'center'
    },
  })
)

export default useStyles;
