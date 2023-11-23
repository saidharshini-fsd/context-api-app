import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { data } from "./data";

export const BooksContext = createContext();

function App() {
  const [state, setState] = useState({
    booklist: data.products,
    cart: []
  });

  const addToCart = (book) => {
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === book.id)
        ? state.cart.map((cartItem) =>
            cartItem.id === book.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        : [...state.cart, { ...book, count: 1 }]
    });
  };

  const removeFromCart = (id) => {
    setState({
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== id)
    });
  };

  const increase = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      )
    });
  };

  const decrease = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      )
    });
  };

  return (
    <BooksContext.Provider
      value={{ state, addToCart, increase, decrease, removeFromCart }}
    >
      <Router>
        <div className="App">
          <h2>
            <span>Shopping Cart App</span>
          </h2>
          <Routes>
            <Route
              path="/"
              element={<Products addToCart={addToCart} />} // Pass addToCart function to Products component
            />
            <Route
              path="/cart"
              element={<Cart removeFromCart={removeFromCart} increase={increase} decrease={decrease} />} // Pass necessary functions to Cart component
            />
          </Routes>
        </div>
      </Router>
    </BooksContext.Provider>
  );
}

export default App;
