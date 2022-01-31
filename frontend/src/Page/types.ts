import { ErrorEnum } from "../utils/errors";

export interface Page {
  id?: number;
  title: string;
  content: string;
  views?: number;
}

export interface PageState {
  current?: Page;
  loading: boolean;
  error?: ErrorEnum;
}