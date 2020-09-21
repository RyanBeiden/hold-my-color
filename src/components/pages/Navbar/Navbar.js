import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import {
  Button,
  Popover,
  Box,
} from '@material-ui/core';

import './Navbar.scss';

class Navbar extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { authed } = this.props;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div className="Navbar">
        {authed
          ? <nav>
              <Link to="/home" className="Navbar__logo"><h1>Hold My Color</h1></Link>
              <Button className="Navbar__icon" aria-describedby={id} onClick={this.handleClick}><MenuRoundedIcon /></Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box className="Navbar__menu-content">
                  <div className="Navbar__palettes">
                    <Link to="/home" className="Navbar__link"><Button variant="contained" className="Navbar__button">Palettes</Button></Link>
                  </div>
                  <div className="Navbar__login">
                    <Button variant="contained" onClick={this.signOut} className="Navbar__button">Logout</Button>
                  </div>
                </Box>
              </Popover>
            </nav>
          : <nav>
              <Link to="/home" className="Navbar__logo"><h1>Hold My Color</h1></Link>
            </nav>
          }
        <svg className="Navbar__wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L120,80C240,96,480,128,720,138.7C960,149,1200,139,1320,133.3L1440,128L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </div>
    );
  }
}

export default Navbar;
