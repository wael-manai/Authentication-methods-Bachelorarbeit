import React from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { useState, useEffect, useContext } from 'react';
import { magic } from './lib/magic';

const Login = () => { 
  const [email, setEmail] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e) => setEmail(e.target.value);

  async function handleLoginWithEmail() {
    try {
      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href
      });
      // Validate didToken with server
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/magic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
  
      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic.user.getMetadata();
        console.log(userMetadata.email);
      // await setUser(userMetadata);
        history.push('/magichome');
      }
    } catch (err) {
     console.log(err);
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />  
        </Avatar>
        <Typography component="h1" variant="h5">Login</Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Input name="email" label="E-mail Addresse" handleChange={handleChange} type="email" />
          </Grid>
          <br /><br />
              <Button className="classes.submit" fullWidth variant ="contained" color="primary" onClick={()=> history.push('/auth')} > Weiter mit Passwort
              </Button>
          <Button onClick={handleLoginWithEmail} fullWidth variant="contained" color="primary" className={classes.submit}>
            Anmedung
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
