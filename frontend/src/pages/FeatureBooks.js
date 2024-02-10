
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Book from '../components/book';
import './feature.css'

const FeaturedBooks = () => {
  const { books } = useSelector((state) => state.books);


  const featuredBooks = books.slice(3,7);

  return (
    <div className='wrapper-book'>
    <Grid container spacing={3}>
      {featuredBooks.map((book) => (
        <Grid key={book.id} item xs={12} sm={6} md={3}>
          <Book book={book} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default FeaturedBooks;
