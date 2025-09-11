import { createSlice } from "@reduxjs/toolkit";

const initialState = { ids: [] }; // sadece product id'leri

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggle(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(x => x !== id);
      } else {
        state.ids.push(id);
      }
    },
    add(state, action) {
      const id = action.payload;
      if (!state.ids.includes(id)) state.ids.push(id);
    },
    remove(state, action) {
      const id = action.payload;
      state.ids = state.ids.filter(x => x !== id);
    },
    clear(state) { state.ids = []; }
  }
});

export const { toggle, add, remove, clear } = wishlistSlice.actions;
export const selectWishlistIds = (s) => s.wishlist.ids;
export const selectIsWishlisted = (id) => (s) => s.wishlist.ids.includes(id);

export default wishlistSlice.reducer;
