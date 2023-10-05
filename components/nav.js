// import React from 'react'
'use client'
import { AppBar, Typography, Toolbar, Button, Box } from '@mui/material'
import { Abc } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

const Nav = () => {
     const router = useRouter();
     const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
      setUserLogged(!!localStorage.getItem('access_token'));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Abc />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>DigiBooks</Typography>
          {userLogged ? (
            <Button color="inherit" onClick={() => {localStorage.clear(); setUserLogged(false); router.replace('/')}}>Logout</Button>
          ) : (
            <Box>
              <Button color="inherit" href='/login'>Login</Button>
              <Button color="inherit" href='/register'>Register</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Nav
