import { baseApi } from './api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<any, any>({
      query: () => ({
        url: '/wallet',
        method: 'GET',
      }),
      providesTags: ['Wallet'],
    }),
    fundWallet: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/wallet/fund',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Wallet'],
    }),
  }),
});

export const { useGetWalletQuery, useFundWalletMutation } = authApi;
