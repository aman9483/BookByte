import React from 'react'
import { Link } from 'react-router-dom'
import './book.css'

const book = ({book}) => {
  return (
    <>

    <Link className='BookCard' to={`/book/${book._id}`}>
        <img src={book.images[0].url} alt={book.name}/>

        <h2>{book.name}</h2>


        <p>{book.authorName}</p>

        <p>{book.description}</p>

        <div>

            <span>Rs {`${ book.price}`}</span>

        </div>
    
    
    </Link>
      
    </>
  )
}

export default book
