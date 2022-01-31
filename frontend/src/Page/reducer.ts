import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../utils/store";
import { Page, PageState } from "./types";
import { ErrorEnum } from "../utils/errors";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../utils/redux";

export const initialState: PageState = {
  current: undefined,
  loading: false,
  error: undefined,
};

export const currentPageSelector = (state: RootState): Page | undefined =>
  state.page.current;
export const errorSelector = (state: RootState): ErrorEnum | undefined => {
  return state.page.error;
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    resetError: (state) => {
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction("page/"), (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addMatcher(isRejectedAction("page/"), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isFulfilledAction("page/"), (state, action) => {
        state.current = action.payload.page;
        state.loading = false;
      });
  },
});

export const { resetError } = pageSlice.actions;

const pageReducer = pageSlice.reducer;
export default pageReducer;