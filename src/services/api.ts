import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      headers.set('X-Client-Type', 'demoCredit-webapp');
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['User', 'Wallet'],
  endpoints: () => ({}),
});
