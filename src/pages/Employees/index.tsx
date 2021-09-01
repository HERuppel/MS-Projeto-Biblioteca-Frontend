import React, { useEffect } from 'react'
import useStyles from './styles'



const Employees: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2>Employees</h2>
    </div>
  )
}

export default Employees
