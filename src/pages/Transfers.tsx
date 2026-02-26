import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetWalletQuery, useFundWalletMutation } from '../services/wallet';
import { selectCurrentUser } from '../store/slices/userSlice';

const Transfers: React.FC = () => {
  const { data: walletData, isLoading, error } = useGetWalletQuery({});
  const [fundWallet, { isLoading: isFunding }] = useFundWalletMutation();
  const user = useSelector(selectCurrentUser);

  const [fundAmount, setFundAmount] = useState('');
  const [fundError, setFundError] = useState('');
  const [fundSuccess, setFundSuccess] = useState('');

  const balance = walletData?.balance ? Number(walletData.balance) / 100 : 0;
  const isBlocked = walletData?.is_disabled;

  const handleFund = async (e: React.FormEvent) => {
    e.preventDefault();
    setFundError('');
    setFundSuccess('');

    const amountNum = Number(fundAmount);
    if (!amountNum || amountNum <= 0) {
      setFundError('Please enter a valid amount.');
      return;
    }

    try {
      await fundWallet({
        amount: amountNum * 100, // convert back to kobo/cents for backend
        email: user?.email,
        reference: `FUND-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        description: 'Wallet Funding',
      }).unwrap();

      setFundSuccess('Wallet funded successfully!');
      setFundAmount('');

      // Clear success message after a few seconds
      setTimeout(() => setFundSuccess(''), 3000);
    } catch (err: any) {
      setFundError(err?.data?.message || err?.data?.error || 'Failed to fund wallet.');
    }
  };

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Transfers Hub</h1>
      <p className="text-gray-500 font-medium mb-10">Manage your money, send funds, and review your activity.</p>

      {/* Wallet Overview Card */}
      <div className="bg-gray-950 rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-gray-200 mb-8">
        {/* Subtle background gloss */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-gray-400 font-semibold text-sm uppercase tracking-widest mb-1">Available Balance</p>
            {isLoading ? (
              <div className="h-12 w-48 bg-gray-800 rounded animate-pulse" />
            ) : error ? (
              <p className="text-red-400 font-medium">Failed to load balance</p>
            ) : (
              <h2 className="text-5xl font-black text-white tracking-tighter">
                ₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isLoading && !error && (
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${isBlocked
                ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                {isBlocked ? 'Blocked' : 'Active'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fund Wallet Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fund Wallet</h2>
          <p className="text-sm text-gray-500 font-medium mb-6">Instantly add money to your account.</p>

          <form onSubmit={handleFund} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                Amount (₦)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
                <input
                  id="amount"
                  type="number"
                  disabled={isBlocked}
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 placeholder-gray-400 font-bold transition-all focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {fundError && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-semibold">
                {fundError}
              </div>
            )}

            {fundSuccess && (
              <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-600 font-semibold">
                {fundSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={isFunding || isBlocked || !fundAmount}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isFunding ? 'Processing…' : 'Add Funds'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Transfers;
