// Home.js

import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Explore as ExploreIcon } from '@material-ui/icons';
import BookStoreImage from '../assests/book.jpg';
import './home.css';
import Footer from '../components/footer';
import Category from '../components/category';
import FeaturedBooks from './FeatureBooks';
import Loader from '../components/loader/loader'; // Import your loader component

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const fetchData = async () => {

     
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
       
        <Loader />
      ) : (
        
        <div className="home-container">
          <img src={BookStoreImage} alt="Book" id="Book" />
          <div className="overlay-container">
            <div className="explore-button-container">
              <Link to="/shop">
                <Button
                  variant="contained"
                  color="primary"
                  className="explore-button"
                  startIcon={<ExploreIcon />}
                >
                  Explore More Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Category />
      <div className="featured-books-container">
        <Typography variant="h2" gutterBottom className="featured-books-heading">
          Featured Books
        </Typography>
        <FeaturedBooks />
      </div>
      <Footer />
    </>
  );
};

export default Home;
