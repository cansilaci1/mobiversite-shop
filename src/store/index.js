import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import wishlist from "./wishListSlice";

const LS_KEY = "redux_state";

function loadState() {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch { return undefined; }
}
function saveState(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ cart: state.cart, wishlist: state.wishlist })
    );
  } catch {}
}

export const store = configureStore({
  reducer: { cart, wishlist },
  preloadedState: loadState()
});

if (typeof window !== "undefined") {
  store.subscribe(() => saveState(store.getState()));
}
