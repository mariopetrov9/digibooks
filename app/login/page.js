'use client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Box, Typography } from '@mui/material'
import BasicForm  from '@/components/BasicForm';

const login = values => {
  axios
    .post('https://books-library-dev.herokuapp.com/api/user/login', {
      username: values.username,
      password: values.password,
    })
    .then((response) => {
      const { data } = response;
      window.localStorage.setItem('access_token', data.token);
      window.location.replace('/');
    })
    .catch((e) => {
      alert(e.response.data.error)
      console.log('ERROR', e.response.data)
    })
}

const RegisterPage = () => {

  return (
    <Box mt={2} maxWidth="sm" sx={{ height: '100vh', margin: '100px auto' }}>
      <Typography
        variant="h3"
        component="div"
        color="primary"
        align="center"
        sx={{ mb: 4 }}
      >
        LOGIN
      </Typography>
      <BasicForm handleSubmit={login} />
            {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successful Registration!
        </Alert>
      </Snackbar> */}
    </Box>
  )
}

export default RegisterPage
