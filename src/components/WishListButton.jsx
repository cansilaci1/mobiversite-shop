"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggle, selectIsWishlisted } from "@/store/wishlistSlice";

export default function WishlistButton({ productId, className = "" }) {
  const dispatch = useDispatch();
  const isOn = useSelector(selectIsWishlisted(productId));

  return (
    <button
      className={`btn btn-outline ${className}`}
      onClick={() => dispatch(toggle(productId))}
      aria-pressed={isOn}
      title={isOn ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isOn ? "♥" : "♡"} Wishlist
    </button>
  );
}
