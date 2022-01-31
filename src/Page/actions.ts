import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { RootState } from "../utils/store";
import { Page } from "./types";
import { api, handleAPIError } from "../utils/api";
import { ErrorEnum } from "../utils/errors";

export const createPage = createAsyncThunk<
  { page: Page },
  { title: string, content: string },
  { state: RootState }
>("page/create", async ({ title, content }, thunkAPI) => {
  let response: AxiosResponse<Page>;

  try {
    response = await api.post(`/pages`, {title, content});
  }
  catch (error) {
    return thunkAPI.rejectWithValue(handleAPIError(error));
  }

  return { page: response.data };
});

export const getPage = createAsyncThunk<
  { page: Page },
  { title: string },
  { state: RootState }
>("page/get", async ({ title }, thunkAPI) => {
  let response: AxiosResponse<Page>;

  try {
    response = await api.get(`/pages/${title}`);
  }
  catch (error: any) {
    if (error?.response?.data === ErrorEnum.PAGE_NOT_FOUND) {
      return { page: { title, content: ""} }
    }

    return thunkAPI.rejectWithValue(handleAPIError(error));
  }

  return { page: response.data };
});

export const updatePage = createAsyncThunk<
  { page: Page },
  { title: string, content: string },
  { state: RootState }
>("page/update", async ({ title, content }, thunkAPI) => {
  const pageId = thunkAPI.getState().page.current?.id;
  if (!pageId) {
    thunkAPI.rejectWithValue(ErrorEnum.PAGE_NOT_FOUND)
  }

  let response: AxiosResponse<Page>;
  try {
    response = await api.patch(
      `/pages/${pageId}`,
      { title: title, content: content }
    );
  }
  catch (error) {
    return thunkAPI.rejectWithValue(handleAPIError(error));
  }

  return { page: response.data };
});