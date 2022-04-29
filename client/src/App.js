import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { magic } from './components/Auth/lib/magic'; 
import { UserContext } from './components/Auth/lib/UserContext';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Magic from './components/Auth/Magic';
import MagicHome from './components/Home/MagicHome'
import Callback from './components/Auth/callback';

function App(){

  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, set it to {user: null}
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      return isLoggedIn
        ? magic.user.getMetadata().then((userData) => setUser(userData))
        : setUser({ user: null });
    });
  }, []);

return(
<BrowserRouter>
  <UserContext.Provider value={[user, setUser]}>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path='/magic' exact component={Magic} />
        <Route path='/callback' exact component={Callback} />
        <Route path="/magichome" exact component={MagicHome} />
      </Switch>
    </Container>
    </UserContext.Provider>
  </BrowserRouter>
)
  
}

export default App;
