import React from 'react'
import { Switch, Route } from 'react-router-dom';

import SideBar from '../../components/SideBar'
import { BookListProvider } from '../../hooks/bookApi';
import { EmployeeListProvider } from '../../hooks/employeeApi';
import Books from '../Books';
import Employees from '../Employees';
import useStyles from './styles'

const Main: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SideBar />
      <main className={classes.main}>
        <Switch>
          <BookListProvider>
            <Route path="/main/books" exact component={Books} />
          </BookListProvider>
        </Switch>
        <Switch>
          <EmployeeListProvider>
            <Route path="/main/employees" exact component={Employees} />
          </EmployeeListProvider>
        </Switch>
      </main>
    </div>
  )
}

export default Main
