// Cart.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const context = useContext(BooksContext);

  const totalCartAmount = context.state.cart
    .reduce((total, book) => (total = total + book.price * book.count), 0)
    .toFixed(2);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  return (
    <div className="container">
      <h2>
        <Link to="/" className="text-white">Products</Link>{" "}
        <span>My Cart({totalCartCount})</span>
      </h2>

      <h3>Total Cart Amount: &#8378;{totalCartAmount}</h3>

      {context.state.cart.map((book) => (
        <div key={book.id} className="card mb-4" style={{ width: "18rem" }}>
          <img
            src={book.thumbnail}
            alt={book.title}
            className="card-img-top"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">Author: {book.brand}</p>
            <p className="card-text">Price: &#8378;{book.price}</p>
            <p className="card-text">
              Total: &#8378;{(book.price * book.count).toFixed(2)}
            </p>
            <p className="card-text">
              You have a total of {book.count} in your cart.
            </p>
            <div className="btn-group">
              <button
                onClick={() => context.decrease(book.id)}
                className="btn btn-secondary"
              >
                -
              </button>
              <button
                onClick={() => context.removeFromCart(book.id)}
                className="btn btn-danger"
              >
                Remove
              </button>
              <button
                onClick={() => context.increase(book.id)}
                className="btn btn-secondary"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
