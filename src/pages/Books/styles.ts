import { Theme, makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      alignSelf: 'center'
    },
    content: {
    },
  })
)

export default useStyles;
