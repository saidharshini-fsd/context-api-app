// Cart.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const Cart = () => {
  const context = useContext(BooksContext);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  const totalCartAmount = context.state.cart
    .reduce((total, book) => (total = total + book.price * book.count), 0)
    .toFixed(2);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <Link to="/" className="btn btn-primary">
          <span>Books</span>
        </Link>{" "}
        <span>My Cart ({totalCartCount})</span>
      </h2>
      <h3>Total Cart Amount: &#8378;{totalCartAmount}</h3>
      {context.state.cart.map((book) => (
        <div key={book.id} className="card mb-4">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={book.image}
                alt={book.name}
                className="card-img"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">{book.name}</h4>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Price: &#8378; {book.price}</p>
                <p className="card-text">
                  Total: &#8378;{(book.price * book.count).toFixed(2)}
                </p>
                <p className="card-text">
                  You have a total of {book.count} in your cart.
                </p>
                <div className="btn-group">
                  <button
                    onClick={() => context.decrease(book.id)}
                    className="btn btn-outline-secondary"
                  >
                    -
                  </button>
                  <button
                    onClick={() => context.removeFromCart(book.id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => context.increase(book.id)}
                    className="btn btn-outline-secondary"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
