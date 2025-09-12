import { createSlice } from "@reduxjs/toolkit";

const initialState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggle(state, action) {
      const id = Number(action.payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(x => x !== id);
      } else {
        state.ids.push(id);
      }
    },
    add(state, action) {
      const id = Number(action.payload);
      if (!state.ids.includes(id)) state.ids.push(id);
    },
    remove(state, action) {
      const id = Number(action.payload);
      state.ids = state.ids.filter(x => x !== id);
    },
    clear(state) { state.ids = []; }
  }
});

export const { toggle, add, remove, clear } = wishlistSlice.actions;
export const selectWishlistIds = (s) => (s.wishlist?.ids ?? []);
export const selectIsWishlisted = (id) => (s) => (s.wishlist?.ids ?? []).includes(Number(id));

export default wishlistSlice.reducer;
