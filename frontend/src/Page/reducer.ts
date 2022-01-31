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
  shouldRedirect: false,
};

export const currentPageSelector = (state: RootState): Page | undefined =>
  state.page.current;
export const errorSelector = (state: RootState): ErrorEnum | undefined =>
  state.page.error;
export const shouldRedirectSelector = (state: RootState): boolean =>
  state.page.shouldRedirect;

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    resetError: state => {
      state.loading = false;
      state.error = undefined;
    },
    resetRedirect: state => {
      state.shouldRedirect = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction("page/"), (state) => {
        state.loading = true;
        state.error = undefined;
        state.shouldRedirect = false;
      })
      .addMatcher(isRejectedAction("page/"), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher(isFulfilledAction("page/"), (state, action) => {
        if ( !action.type.startsWith('page/get')
          && action.payload.page.title !== state.current?.title) {
          state.shouldRedirect = true;
        }
        state.current = action.payload.page;
        state.loading = false;
      });
  },
});

export const { resetError, resetRedirect } = pageSlice.actions;

const pageReducer = pageSlice.reducer;
export default pageReducer;