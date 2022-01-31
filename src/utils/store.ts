import { configureStore } from "@reduxjs/toolkit";

import pageReducer from "../Page/reducer";

export const store = configureStore({
  reducer: { page: pageReducer },
});

export type RootState = ReturnType<typeof store.getState>;