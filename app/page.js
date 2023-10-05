import Image from 'next/image'
import styles from './page.module.css'
import {
  Container,
  Typography,
} from '@mui/material'

export default function Home() {
  return (
    <>
      <main>
          <Container sx={{height:'100vh'}} maxWidth="sm">
            <Typography mt={8} variant="h2" align="center" color="textPrimary" gutterBottom>Home page</Typography>
          </Container>
      </main>
    </>
  )
}
