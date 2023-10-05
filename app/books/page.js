'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
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

const getBooks = (token, setBooks) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  axios
    .get('https://books-library-dev.herokuapp.com/api/book', config)
    .then((response) => setBooks(response.data))
    .catch((e) => console.log('Books Error', e.response))
}

const BooksPage = () => {
  const router = useRouter()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      getBooks(token, setBooks)
    } else {
      router.replace('/login')
    }
  }, [])

  return (
    <Box mt={2} maxWidth="sm" sx={{ height: '100vh', margin: '100px auto' }}>
      <Grid container spacing={0} justifyContent="center">
        {books.map((book) => (
          <Grid item xs={12} sm={6} p={2} key={book._id}>
            <Card>
              <CardMedia
                sx={{ height: 250 }}
                image={book.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genre: {book.genre.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/books/${book._id}`}>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default BooksPage
