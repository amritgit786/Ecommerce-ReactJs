import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
  },
  reducers: {
    addToBag: (state, action) => {
      const pid = action.payload;
      const existingItem = state.items.find((item) => item.pid === pid);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ pid, qty: 1 });
      }
    },
    removeFromBag: (state, action) => {
      const pid = action.payload;
      state.items = state.items.filter((item) => item.pid !== pid);
    },
    incrementQty(state, action) {
      const item = state.items.find((item) => item.pid === action.payload);
      if (item) {
        item.qty += 1;
      }
    },
    decrementQty(state, action) {
      const item = state.items.find((item) => item.pid === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
  },
});

export const bagActions = bagSlice.actions;

export default bagSlice;
