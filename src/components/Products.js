// Products.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles


const Products = () => {
  const context = useContext(BooksContext);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <span>Books</span>
        <Link to="/cart" className="btn btn-primary ml-2">
          My Cart ({totalCartCount})
        </Link>
      </h2>
      <div className="row">
        {context.state.booklist.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={book.image}
                alt={book.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h4 className="card-title">{book.name}</h4>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Price: &#8378; {book.price}</p>
                <button
                  onClick={() => context.addToCart(book)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
