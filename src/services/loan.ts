import { baseApi } from './api';

export const loanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyForLoan: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/loans/apply',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['LoanApplications' as any],
    }),
    getLoanApplications: builder.query<any[], void>({
      query: () => '/loans',
      providesTags: ['LoanApplications' as any],
    }),
  }),
});

export const {
  useApplyForLoanMutation,
  useGetLoanApplicationsQuery
} = loanApi;
