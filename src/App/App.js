import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Redirect,
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/Auth';
import Navbar from '../components/pages/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import EditPalette from '../components/pages/EditPalette/EditPalette';
import EditColor from '../components/pages/EditColor/EditColor';
import SinglePalette from '../components/pages/SinglePalette/SinglePalette';
import NewPalette from '../components/pages/NewPalette/NewPalette';
import NewColor from '../components/pages/NewColor/NewColor';

import './App.scss';

connection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar authed={authed} />
            <div className="route-container">
              <Switch>
                <PrivateRoute path="/home" component={Home} authed={authed} />
                <PrivateRoute path="/palettes/edit/:paletteId" component={EditPalette} authed={authed} />
                <PrivateRoute path="/:paletteId/edit/:colorId" component={EditColor} authed={authed} />
                <PrivateRoute path="/palettes/:paletteId" component={SinglePalette} authed={authed} />
                <PrivateRoute path="/new-palette" component={NewPalette} authed={authed} />
                <PrivateRoute path="/:paletteId/new-color" component={NewColor} authed={authed} />
                <PublicRoute path="/auth" component={Auth} authed={authed} />
                <Redirect from="*" to="/home" />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
