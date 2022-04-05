import {Alert, Button, Grid, Snackbar, TextField} from '@mui/material';
import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from "next/router";
import ChatIcon from '@mui/icons-material/Chat';

import {Users} from '../../types/interfaces'
import {api} from "../../interceptor";
import loginStyles from "./index.style";

type userLogin = Pick<Users, "email" | "password">;

const Login = () => {
  const classes = loginStyles();
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('')

  const handleClose = () => {
    setOpen(false);
  };

  const createError = (error: string):void => {
    setLoginError(error)
    setOpen(true);
  }

  const authorization = async (values: userLogin) => {
    try {
      const response = await api.post('http://localhost:5001/authorization/log', {
        email: values.email,
        password: values.password
      })
      localStorage.setItem('accessToken', `${response.data.accessToken}`)
      localStorage.setItem('refreshToken', `${response.data.refreshToken}`)
      localStorage.setItem('userId', `${response.data.userId}`)
      localStorage.setItem('userName', `${response.data.userName}`)
      router.push('/main')
    } catch (e) {
      createError('Invalid email or password!')
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid
        container
        height='100vh'
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          container
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          className={classes.wrapper}
          width='350px'
        >
          <h1>Login in a chat <ChatIcon color={'primary'} /></h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              authorization(values)
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
              <form
                className={classes.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                <Grid container flexDirection="column" alignItems="center">
                  <Grid item className={classes.item}>
                    <TextField
                      InputProps={{
                        className: classes.field
                      }}
                      label="Email"
                      variant="outlined"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item className={classes.item}>
                    <TextField
                      InputProps={{
                        className: classes.field
                      }}
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item className={classes.item} mb={1.5}>
                    <Button
                      variant="contained"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
                <Grid item className={classes.item}>
                  <Link href='/registration'>
                    <a className={classes.link}>Sing up</a>
                  </Link>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {loginError}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Login;