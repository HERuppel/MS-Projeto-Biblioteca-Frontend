import React from 'react';
import { NavLink } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Book, Person, Group, MenuBook } from '@material-ui/icons';

import useStyles from './styles';


const SideBar: React.FC = () => {
  const classes = useStyles();

  const menu = (
    <div>
      <div className={classes.header}>
        <Typography
          variant="h4"
        >
          Biblioteca DPM
        </Typography>
      </div>
      <List>
        <ListItem className={classes.navLink} component={NavLink} to="/main/books" activeClassName={classes.activeNavLink} key="books">
          <MenuBook style={{ fontSize: 35, paddingRight: 6 }} />
          <ListItemText className={classes.itemText} primary="Livros" />
        </ListItem>
        <ListItem className={classes.navLink} component={NavLink} to="/main/clients" activeClassName={classes.activeNavLink} key="clients">
          <Group style={{ fontSize: 35 }} />
          <ListItemText className={classes.itemText} primary="Clientes" />
        </ListItem>
      </List>
    </div>
  );

  return(
    <nav className={classes.drawer}>
      <Drawer
        open
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {menu}
      </Drawer>
    </nav>
  );
};

export default SideBar;
