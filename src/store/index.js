import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";

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
  try { localStorage.setItem(LS_KEY, JSON.stringify({ cart: state.cart })); } catch {}
}

export const store = configureStore({
  reducer: { cart },
  preloadedState: loadState()
});

if (typeof window !== "undefined") {
  store.subscribe(() => saveState(store.getState()));
}
