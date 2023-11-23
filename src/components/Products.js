// Products.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Products = () => {
    const context = useContext(BooksContext);

    const totalCartCount = context.state.cart.reduce(
        (total, book) => (total = total + book.count),
        0
    );

    return (
        <div className="container">
            <h2 className="text-white">Products</h2>
            <Link to="/cart" className="text-white" style={{fontWeight:"bolder"}}>My Cart({totalCartCount})</Link>
            <div className="row">
                {context.state.booklist.map((book) => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                className="card-img-top"
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Description: {book.description}</p>
                                <p className="card-text">Price: &#8378;{book.price}</p>
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
