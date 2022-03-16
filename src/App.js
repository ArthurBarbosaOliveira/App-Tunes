import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={ (props) => <Login { ...props } /> } />
        <Route path="*" component={ NotFound } />
        <Route path="/profile/edit" component={ ProfileEdit } exact />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/album/:id" component={ (props) => <Album { ...props } /> } />
        <Route path="/search" component={ Search } />
      </BrowserRouter>
    );
  }
}

export default App;
