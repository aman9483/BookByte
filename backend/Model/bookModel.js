const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the book name'],
        trim: true,
        maxLength: 1000
    },
    description: {
        type: String,
        required: [true, 'Please enter the book description'],
        maxLength: 1000
    },
    price: {
        type: Number,
        required: [true, 'Please enter the book price'],
    },
 
    authorName: {
            type: String,
            required: [true, 'Please enter the author name'],
            trim: true,
            maxLength: 1000
        },

        images: [
            {
              public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
            },
          ],
          category: {
            type: String,
            required: [true, "Please Enter Product Category"],
          },
          Stock: {
            type: Number,
            required: [true, "Please Enter product Stock"],
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1,
          },

          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            // required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    
});

module.exports = mongoose.model('Book', BookSchema);
