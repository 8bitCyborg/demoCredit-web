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
      invalidatesTags: ['Wallet', 'Ledger'],
    }),
    withdraw: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/wallet/withdraw',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Wallet', 'Ledger'],
    }),
    transfer: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/wallet/transfer',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Wallet', 'Ledger'],
    }),
    validateReceiver: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/user/validate-receiver',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserLedger: builder.query<any, any>({
      query: () => ({
        url: '/ledger/get-user-ledger',
        method: 'GET',
      }),
      providesTags: ['Ledger'],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useFundWalletMutation,
  useWithdrawMutation,
  useTransferMutation,
  useValidateReceiverMutation,
  useGetUserLedgerQuery
} = authApi;
