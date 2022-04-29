import React from 'react';
import { Paper, Typography, Container, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../Auth/styles';
import { magic } from '../Auth/lib/magic';
import { useHistory } from 'react-router-dom';

const MagicHome = () => {
      const classes = useStyles();
      const history = useHistory();
  return (
      <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>

        <Typography component="h1" variant="h5">It's Magic Login</Typography>
        <br />
        <Button className="classes.submit" fullWidth variant ="contained" color="primary" onClick={()=> {
            magic.user.logout();
            history.push('/auth');
        }} > Magic- Logout
              </Button>
      </Paper>
    </Container>
  );
};

export default MagicHome;
