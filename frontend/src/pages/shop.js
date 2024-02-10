import React, { useEffect, useState } from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl, IconButton, useMediaQuery, TextField } from '@material-ui/core';
import { FilterList as FilterListIcon, Search as SearchIcon } from '@material-ui/icons';
import Book from '../components/book';
import './shop.css';
import { getBooks } from '../action/bookAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/loader/loader';
import Footer from '../components/footer';

const Shop = () => {
  const dispatch = useDispatch();
  const { loading, books } = useSelector((state) => state.books);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const filteredBooks = books.filter((book) => {
    const categoryMatch =
      book.category.toLowerCase() === filter.toLowerCase() || filter === 'all';
    const titleMatch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && titleMatch;
  });

  return (
    <div className="shop-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="filter-search-container">
            <FormControl variant="outlined" className="filter-form">
              <InputLabel id="filter-label">Filter by Genre:</InputLabel>
              <Select
                labelId="filter-label"
                id="filter-select"
                value={filter}
                onChange={handleFilterChange}
                label="Filter by Genre"
                IconComponent={() => <IconButton size="small"><FilterListIcon /></IconButton>}
              >
                <MenuItem value="all">All Book</MenuItem>
                <MenuItem value="fiction">fiction book</MenuItem>
                <MenuItem value="tech">tech book</MenuItem>
                <MenuItem value="thriller">thriller book</MenuItem>
                <MenuItem value="philosophy">philosophy book</MenuItem>
                <MenuItem value="romance">romance book</MenuItem>
                <MenuItem value="manga">manga book</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="search-input"
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
              InputProps={{
                endAdornment: <IconButton><SearchIcon /></IconButton>,
              }}
            />
          </div>

          <Grid container spacing={3}>
            {filteredBooks.map((book) => (
              <Grid key={book.id} item xs={12} sm={isSmallScreen ? 12 : 6} md={4} lg={4}>
                <Book book={book} />
              </Grid>
            ))}
          </Grid>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Shop;
