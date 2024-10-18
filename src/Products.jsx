import React from "react";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";

export default function Products() {
  const initialState = {
    products: [],
    statues: "loading",
  };

  const [{ products, statues }, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "dataRec":
        return { ...state, products: action.payload, statues: "ready" };
      case "dataFailed":
        return { ...state, statues: "error" };

      default:
        throw new Error("Something went wrong");
    }
  }
  async function getProducts() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      dispatch({ type: "dataRec", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="py-5 min-vh-100">
        {statues === "loading" && <Loader />}
        <div className="container pt-4">
          {statues === "error" && (
            <div className="alert alert-danger mt-2 container">
              Something Went Wrong
            </div>
          )}
          <div className="row gy-4 pt-3">
            {products.map((product) => (
              <div className="col-md-4 col-lg-3" key={product.id}>
                <div className="card product cursor-pointer shadow-sm">
                  <img className=" img-h" src={product.image} alt="" />
                  <div className="card-body">
                    <h5 className="card-title mb-3">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h5>

                    <div className="d-flex justify-content-between px-1">
                      <p> {product.price} $</p>
                      <p>
                        {product.rating.rate}
                        <i className="fas fa-star rating-color ms-1"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
