import React, { useState } from 'react'
import { 
  Drawer as MUIDrawer, 
  List, ListItem, 
  ListItemIcon, 
  ListItemText, 
  AppBar,
  Toolbar,
  TextField,
  IconButton
} from '@material-ui/core';
import { MoveToInbox,Mail,Menu, Inbox} from '@material-ui/icons';
import { Search, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { fade, makeStyles,useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { withRouter } from "react-router-dom";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(4)
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  searchContainer :{
    display : 'flex',
    backgroundColor:fade(theme.palette.common.white,0.2),
    // padding: '6px',
    margin:'8px'
  },
  searchIcon : {
    alignSelf : 'flex-end',
    marginBottom: '3px',
    marginLeft:'4px'
  },
  searchInput : {
    width: '200px',
    margin: '4px'
  },
}));

const Drawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log('props',props)
  const { onOpen, onClose, open, searchChange, history } = props;
  const itemsList = [
    {
      text: "Home",
      icon: <Inbox />,
      onClick: () => history.push("/")
    },
    {
      text: "About",
      icon: <Mail />,
      onClick: () => history.push("/1")
    },
    {
      text: "Contact",
      icon: <Mail />,
      onClick: () => history.push("/2")
    }
  ];
  return (
    <div>
      <AppBar 
        position = 'fixed' 
        color = 'primary' 
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })} 
      >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <Menu/>
        </IconButton> 
        <div className = {classes.searchContainer}>
          <Search className = {classes.searchIcon}/>
          <TextField className = {classes.searchInput} label ='Pokemon' variant = 'standard' onChange = {(e)=>searchChange(e)} />
        </div> 
      </Toolbar>
    </AppBar>
    <MUIDrawer
      className = {classes.drawer}
      variant = 'persistent'
      anchor = 'left'
      open = {open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
    <div className={classes.drawerHeader}>
      <IconButton onClick={onClose}>
        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </div>
    <List>
      {itemsList.map((item, index) => {
        const {text,icon,onClick} = item;
        return icon && <ListItem button key={text} onClick = {onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      })}
    </List>
    </MUIDrawer>
    </div>
  )
}

export default withRouter(Drawer);
