import React from 'react';
import { Typography, Container, Paper, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, textAlign: 'center' }}>
        <BookIcon sx={{ fontSize: 80, color: '#4CAF50', marginBottom: 2 }} />
        <Typography variant="h4" gutterBottom>
          Welcome to bookByte
        </Typography>
        <Typography paragraph>
          Discover the joy of reading with bookByte – your premier destination for the latest and greatest books.
        </Typography>
        <Typography paragraph>
          Immerse yourself in a world of captivating stories, spanning genres and satisfying every literary taste.
        </Typography>
        <Typography paragraph>
          Our mission is to connect you with the books you love, delivered with care to your doorstep.
        </Typography>
        <Typography>
          Let's embark on a reading adventure together!
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
          Explore Our Collection
        </Button>
      </Paper>
    </Container>
  );
};

export default About;
