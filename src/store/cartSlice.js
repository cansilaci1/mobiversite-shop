import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] }; // [{id,title,price,quantity}]

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, title, price, qty = 1 } = action.payload;
      const found = state.items.find(i => i.id === id);
      if (found) found.quantity += qty;
      else state.items.push({ id, title, price, quantity: qty });
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const q = Math.max(1, Number(qty) || 1);
      const found = state.items.find(i => i.id === id);
      if (found) found.quantity = q;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    clearCart(state) {
      state.items = [];
    },
  }
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;

// selectors
export const selectCartItems = (s) => s.cart.items;
export const selectCartTotal = (s) => s.cart.items.reduce((t,i)=>t+i.price*i.quantity,0);
export const selectCartCount = (s) => s.cart.items.reduce((t,i)=>t+i.quantity,0);

export default cartSlice.reducer;
