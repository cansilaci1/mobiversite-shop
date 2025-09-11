"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export default function AddToCartButton({ product, qty = 1, className = "" }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={() =>
        dispatch(addToCart({ id: product.id, title: product.title, price: product.price, qty }))
      }
    >
      Add to Cart
    </button>
  );
}
