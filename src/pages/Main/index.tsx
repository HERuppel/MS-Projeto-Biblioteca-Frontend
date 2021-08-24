import React from 'react'
import { Switch, Route } from 'react-router-dom';

import SideBar from '../../components/SideBar'
import Books from '../Books';
import Clients from '../Clients';
import useStyles from './styles'

const Main: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SideBar />
      <main className={classes.main}>
        <Switch>
          <Route path="/main/books" exact component={Books} />
          <Route path="/main/clients" exact component={Clients} />
        </Switch>
      </main>
    </div>
  )
}

export default Main
