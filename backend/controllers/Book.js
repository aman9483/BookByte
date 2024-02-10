const Book = require('../Model/bookModel');
const ApiFeatures = require("../utiles/ApiFeatures");

//book creation - admin

exports.CreateBook = async (req, res) => {
    try {
       
        const book = await Book.create(req.body);

        res.status(201).json({
          success: true,
          book,
        });

        res.status(200).json({
            success: true,
            message: 'Book created successfully',
            book,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};


exports.getAllBooks = async (req, res, next) => {
    try {
      const resultPerPage = 24;
      const BookCount = await Book.countDocuments();
  
      // Create the query without executing it
      const query = Book.find();
  
      const apiFeature = new ApiFeatures(query, req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
  
      // Execute the query
      let books = await apiFeature.execute();
  
      let filteredBookCount = books.length;
  
      res.status(200).json({
        success: true,
        books,
        BookCount,
        resultPerPage,
        filteredBookCount,
      });
    } catch (error) {
      // Handle errors
      next(error);
    }
  };
  
  
  
 exports.getBookDetail = async(req, res)=>{


       const book = await Book.findById(req.params.id);

       try{

            if(!book){

                res.status(400).json({

                    message: 'book not found',
                    success: false
                })

                
            }

            res.status(200).json({

                success: true,

                   book,

            })
       }catch(err){


           res.status(500).json({

               message: err.message,
               success: false
           })
       }
 }

 exports.updateBook = async(req, res)=>{

       let book = await Book.findById(req.params.id);

       if(!book){

            res.status(400).json({

                  message: 'BOOK NOT FOUND',
                  success: false
            })
       }

       book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        message: 'Book Upadted succesfully',
        book,
      });
 }

 exports.deleteBook = async(req, res)=>{

      const book  = await Book.findById(req.params.id);


      try{

        if(!book){

             
            res.status(400).json({

                  message: 'Book Not Found',
                  success: false
            })
        }

        await book.deleteOne();

        res.status(200).json({

              message: 'Book deleted succesfuly',
              success: true,
        })

            
          
      }catch(err){


        res.status(500).json({

             message: err.message,
             success: false
        })


         
      }
 }