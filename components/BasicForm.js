'use client'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(4, 'Username should be of minimum 8 characters length')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
})

const BasicForm = ({ handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        sx={{ mb: 2 }}
        id="password"
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  )
}

export default BasicForm
