'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material'

const getBook = (token, bookId, setBook) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  axios
    .get(`https://books-library-dev.herokuapp.com/api/book/${bookId}`, config)
    .then((response) => setBook(response.data))
    .catch((e) => console.log('Books Error', e.response))
}

const BookPage = () => {
  const router = useRouter();
  const { bookId } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      getBook(token, bookId, setBook);
    } else {
      router.replace('/login')
    }
  }, [])

  return (
    <Box mt={2} maxWidth="sm" sx={{ height: '100vh', margin: '100px auto' }}>
      <Grid container  justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={7} p={2}>
              <Box component="img" height={400} src={book?.image} sx={{display: 'flex', margin: '0 auto' }} />
            </Grid>
            <Grid item xs={12} sm={5} p={2}>
            <Typography textAlign="center" variant='h6'>Name: {book?.name}</Typography>
              <Typography textAlign="center" variant='h6'>Author: {book?.author}</Typography>
              <Typography textAlign="center" variant='h6'>Genre: {book?.genre.name}</Typography>
            </Grid>
      </Grid>
    </Box>
  )
}

export default BookPage
