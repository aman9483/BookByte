const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors')
require("dotenv").config(); 
const Cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload')



const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send("Welcome to server side my friend");
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database Connected:', process.env.DB_URL))
    .catch(error => console.error('Database Connection Error:', error));

    Cloudinary.config({
        cloud_name: process.env.Cloudinary_name,
        api_key: process.env.api_key,
        api_secret: process.env.cloudinary_sceret_key
    });
    
// API works here
const BookRoute = require('./router/book');
const UserRoute = require('./router/user');
const orderRoute = require('./router/order')
const paymentRoute = require('./router/payment')
app.use('/api/v1', BookRoute);
app.use('/api/v1', UserRoute);
app.use('/api/v1', orderRoute)
app.use('/api/v1', paymentRoute)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server Error:', error);
});
