import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Iconfacebook from './iconfacebook';
import Icongoogle from './icongoogle';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const responseFacebook =  async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Register' : 'Login' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="Vorname" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Nachname" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="E-mail Addresse" handleChange={handleChange} type="email" />
            <Input name="password" label="Passwort" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Passwort wiederholen" handleChange={handleChange} type="password" /> }
           
          </Grid>
          <br /><br />
            
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Registrieren' : 'Anmelden' }
          </Button>

          <Button className="classes.submit" fullWidth variant ="contained" color="primary" onClick={()=> history.push('/magic')} > Weiter mit Magic link
              </Button>
              <br /><br />
          <GoogleLogin
            clientId="113741053780-llcfdf9qind246rkugr38k8ckip9obgd.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icongoogle />} variant="contained">
                weiter mit Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />    
           <FacebookLogin
              appId="587014562395428"
              autoLoad
              callback={responseFacebook}
              render={(renderProps) => (
              <Button className={classes.facebookButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Iconfacebook />} variant="contained">
                weiter mit Facebook
              </Button>
                )}
              />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Du hast bereits ein Konto? Anmelden' : "Du hast noch kein konto? Registrieren" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
