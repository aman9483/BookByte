import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loader from '../components/loader/loader';
import { getBooksDetails } from '../action/bookAction';
import { AddToCart } from "../action/cartAction";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { book, loading } = useSelector((state) => state.bookDetails);

  <ToastContainer
    position='top-right'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='light'
  />

  useEffect(() => {
    dispatch(getBooksDetails(params.id));
  }, [dispatch, params.id]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < book.Stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addItemsToCart = () => {
    dispatch(AddToCart(params.id, quantity));
    
    navigate('/cart');

    toast.success('Book added to cart!', ToastContainer);
  };

  const images = book?.images || [];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} lg={6}>
              <Paper elevation={5} sx={{ padding: 3, overflow: 'hidden' }}>
                {images.map((item, i) => (
                  <img
                    key={i}
                    src={item.url}
                    alt={`Book ${i + 1}`}
                    style={{ width: '30%', objectFit: 'cover', marginBottom: '16px', marginLeft: '250px' }}
                  />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper elevation={5} sx={{ padding: 3, borderRadius: '16px', overflow: 'hidden' }}>
                <Typography variant="h4" gutterBottom>
                  {book.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Author: {book.authorName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {book.description}
                </Typography>
                <Typography variant="h6" color={book.Stock < 1 ? 'error' : 'primary'} gutterBottom>
                  {book.Stock < 1 ? 'Out of Stock' : 'In Stock'}
                </Typography>
                <Typography variant="h5" color="secondary" gutterBottom>
                  &#8377;{book.price}
                  {book?.previousPrice && (
                    <span style={{ textDecoration: 'line-through', marginLeft: '8px' }}>
                      Rs{book?.previousPrice}
                    </span>
                  )}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <IconButton onClick={handleDecrement}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ margin: '0 8px' }}>
                    {quantity}
                  </Typography>
                  <IconButton onClick={handleIncrement}>
                    <AddIcon />
                  </IconButton>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Button variant="contained" color="primary" fullWidth onClick={() => addItemsToCart()}>
                    Add To Cart
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
