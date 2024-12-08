import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetching: false,
    fetchDone: false,
  },
  reducers: {
    markFetchingStarted(state) {
      state.fetching = true;
      state.fetchDone = false;
    },
    markFetchingFinished(state) {
      state.fetching = false;
    },
    markFetchDone(state) {
      state.fetchDone = true;
    },
  },
});

export const fetchStatusActions = fetchStatusSlice.actions;
export default fetchStatusSlice;
