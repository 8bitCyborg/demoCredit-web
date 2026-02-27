import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetWalletQuery,
  useFundWalletMutation,
  useWithdrawMutation,
  useTransferMutation,
  useValidateReceiverMutation,
  useGetUserLedgerQuery
} from '../services/wallet';
import { selectCurrentUser } from '../store/slices/userSlice';

const BANKS = [
  { code: '044', name: 'Access Bank' },
  { code: '058', name: 'GTBank' },
  { code: '011', name: 'First Bank' },
  { code: '033', name: 'UBA' },
  { code: '057', name: 'Zenith Bank' },
];

type TabType = 'fund' | 'withdraw' | 'transfer';

const Transfers: React.FC = () => {
  const { data: walletData, isLoading, error } = useGetWalletQuery('',
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const { data: ledgerData, isLoading: isLoadingLedger } = useGetUserLedgerQuery('',
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const [fundWallet, { isLoading: isFunding }] = useFundWalletMutation();
  const [withdrawWallet, { isLoading: isWithdrawing }] = useWithdrawMutation();
  const [transferWallet, { isLoading: isTransferring }] = useTransferMutation();
  const [validateReceiver, { isLoading: isValidatingReceiver }] = useValidateReceiverMutation();
  const user = useSelector(selectCurrentUser);

  const [activeTab, setActiveTab] = useState<TabType>('fund');

  // Fund States
  const [fundAmount, setFundAmount] = useState('');
  const [fundError, setFundError] = useState('');
  const [fundSuccess, setFundSuccess] = useState('');

  // Withdraw States
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawBankCode, setWithdrawBankCode] = useState('');
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState('');

  // Transfer States
  const [transferAmount, setTransferAmount] = useState('');
  const [transferPhone, setTransferPhone] = useState('');
  const [transferError, setTransferError] = useState('');
  const [transferSuccess, setTransferSuccess] = useState('');

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
        amount: amountNum * 100,
        email: user?.email,
        reference: `FUND-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        description: 'Wallet Funding',
      }).unwrap();

      setFundSuccess('Wallet funded successfully!');
      setFundAmount('');
      setTimeout(() => setFundSuccess(''), 3000);
    } catch (err: any) {
      setFundError(err?.data?.message || err?.data?.error || 'Failed to fund wallet.');
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError('');
    setWithdrawSuccess('');

    const amountNum = Number(withdrawAmount);
    if (!amountNum || amountNum <= 0) {
      setWithdrawError('Please enter a valid amount.');
      return;
    }
    if (amountNum > 100000) {
      setWithdrawError('Single withdraw limit is 100,000.');
      return;
    }

    try {
      await withdrawWallet({
        amount: amountNum * 100,
        reference: `WD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        category: 'withdrawal',
        description: 'Wallet Withdrawal',
        counterparty_id: withdrawAccountNumber,
        destination_bank_code: withdrawBankCode,
        counterparty_name: `${user?.first_name} ${user?.last_name}`,
      }).unwrap();

      setWithdrawSuccess('Withdrawal successful!');
      setWithdrawAmount('');
      setWithdrawAccountNumber('');
      setWithdrawBankCode('');
      setTimeout(() => setWithdrawSuccess(''), 3000);
    } catch (err: any) {
      setWithdrawError(err?.data?.message || err?.data?.error || 'Failed to withdraw funds.');
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError('');
    setTransferSuccess('');

    if (transferPhone === user?.phone) {
      setTransferError('You cannot transfer money to yourself.');
      return;
    }

    const amountNum = Number(transferAmount);
    if (!amountNum || amountNum <= 0) {
      setTransferError('Please enter a valid amount.');
      return;
    }
    if (amountNum > 100000) {
      setTransferError('Single transfer limit is 100,000.');
      return;
    }

    try {
      const receiver = await validateReceiver({ phone: transferPhone }).unwrap();

      if (!receiver || !receiver.id) {
        setTransferError('Could not find a user with this phone number.');
        return;
      }

      await transferWallet({
        receiver_user_id: receiver.id,
        receiver_name: `${receiver.first_name} ${receiver.last_name}`,
        sender_name: `${user?.first_name} ${user?.last_name}`,
        amount: amountNum * 100,
        reference: `TRF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        category: 'transfer',
        description: `Transfer from ${user?.first_name}`,
      }).unwrap();

      setTransferSuccess(`Successfully transferred ₦${amountNum} to ${receiver.first_name}`);
      setTransferAmount('');
      setTransferPhone('');
      setTimeout(() => setTransferSuccess(''), 4000);
    } catch (err: any) {
      setTransferError(err?.data?.message || err?.data?.error || err.message || 'Transfer failed.');
    }
  };

  return (
    <div className="p-4 sm:p-10 max-w-7xl mx-auto w-full">
      <header className="mb-8 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Wallet</h1>
        <p className="text-gray-500 font-medium mt-2">Manage your funds and make transfers instantly.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left Column: Wallet & Actions */}
        <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
          {/* Balance Card - Modern Gradient */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 sm:p-10 text-white shadow-2xl shadow-gray-300/50 mb-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex-1">
                <p className="text-gray-400 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  Available Balance
                  {!isLoading && !error && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${isBlocked
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                      {isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  )}
                </p>
                {isLoading ? (
                  <div className="h-14 w-48 bg-gray-800 rounded-xl animate-pulse" />
                ) : error ? (
                  <p className="text-red-400 font-medium">Failed to load balance</p>
                ) : (
                  <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                    <span className="text-3xl sm:text-4xl text-gray-400 mr-1">₦</span>
                    {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                )}
              </div>
            </div>
          </div>

          {/* Segmented Control / Tabs */}
          <div className="flex gap-1 mb-8">
            <button
              onClick={() => setActiveTab('fund')}
              className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl transition-all duration-300 ${activeTab === 'fund' ? 'bg-blue-600 shadow-lg shadow-blue-600/30 text-white' : 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800 hover:text-white'}`}
            >
              Add Money
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl transition-all duration-300 ${activeTab === 'transfer' ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30 text-white' : 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800 hover:text-white'}`}
            >
              Send Money
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-bold rounded-2xl transition-all duration-300 ${activeTab === 'withdraw' ? 'bg-gray-700 shadow-lg shadow-gray-700/30 text-white' : 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800 hover:text-white'}`}
            >
              Withdraw
            </button>
          </div>

          {/* Form Content Wrapper */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10 transition-all duration-300">

            {/* ADD MONEY TAB */}
            {activeTab === 'fund' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Fund Wallet</h2>
                <p className="text-gray-500 font-medium mb-8 text-sm">Instantly top up your DemoCredit wallet balance.</p>

                <form onSubmit={handleFund} className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-bold text-gray-700 mb-3">
                      Amount to add
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-6 text-gray-400 font-black text-2xl">₦</span>
                      <input
                        id="amount"
                        type="number"
                        disabled={isBlocked || isFunding}
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-300 text-2xl font-black transition-all focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  {fundError && (
                    <div className="px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600 font-bold flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      {fundError}
                    </div>
                  )}

                  {fundSuccess && (
                    <div className="px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-600 font-bold flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      {fundSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isFunding || isBlocked || !fundAmount}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isFunding ? 'Processing securely…' : 'Add Funds to Wallet'}
                  </button>
                </form>
              </div>
            )}

            {/* SEND MONEY TAB */}
            {activeTab === 'transfer' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Money</h2>
                <p className="text-gray-500 font-medium mb-8 text-sm">Instantly transfer funds to another DemoCredit user for zero fees.</p>

                <form onSubmit={handleTransfer} className="space-y-6">
                  <div>
                    <label htmlFor="t-phone" className="block text-sm font-bold text-gray-700 mb-3">
                      Recipient Phone
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-6 text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                      </div>
                      <input
                        id="t-phone"
                        type="tel"
                        disabled={isBlocked || isTransferring || isValidatingReceiver}
                        value={transferPhone}
                        onChange={(e) => setTransferPhone(e.target.value)}
                        className="w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 text-lg font-bold transition-all focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="08012345678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="t-amount" className="block text-sm font-bold text-gray-700 mb-3">
                      Amount to send
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-6 text-gray-400 font-black text-2xl">₦</span>
                      <input
                        id="t-amount"
                        type="number"
                        disabled={isBlocked || isTransferring || isValidatingReceiver}
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-300 text-2xl font-black transition-all focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max="100000"
                      />
                    </div>
                  </div>

                  {transferError && (
                    <div className="px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600 font-bold flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      {transferError}
                    </div>
                  )}

                  {transferSuccess && (
                    <div className="px-5 py-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-sm text-indigo-700 font-bold flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      {transferSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isTransferring || isValidatingReceiver || isBlocked || !transferAmount || !transferPhone}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isTransferring || isValidatingReceiver ? 'Processing securely…' : 'Send Fast Transfer'}
                  </button>
                </form>
              </div>
            )}

            {/* WITHDRAW TAB */}
            {activeTab === 'withdraw' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdraw to Bank</h2>
                <p className="text-gray-500 font-medium mb-8 text-sm">Transfer your demoCredit balance to any local bank account.</p>

                <form onSubmit={handleWithdraw} className="space-y-6">
                  <div>
                    <label htmlFor="w-amount" className="block text-sm font-bold text-gray-700 mb-3">
                      Amount to withdraw
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-6 text-gray-400 font-black text-2xl">₦</span>
                      <input
                        id="w-amount"
                        type="number"
                        disabled={isBlocked || isWithdrawing}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-300 text-2xl font-black transition-all focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        max="100000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Destination Bank</label>
                      <select
                        disabled={isBlocked || isWithdrawing}
                        value={withdrawBankCode}
                        onChange={(e) => setWithdrawBankCode(e.target.value)}
                        className="w-full px-5 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 font-bold transition-all focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
                      >
                        <option value="" disabled>Select Bank…</option>
                        {BANKS.map((b) => (
                          <option key={b.code} value={b.code}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Account Number</label>
                      <input
                        type="text"
                        disabled={isBlocked || isWithdrawing}
                        value={withdrawAccountNumber}
                        onChange={(e) => setWithdrawAccountNumber(e.target.value)}
                        className="w-full px-5 py-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-400 font-bold transition-all focus:outline-none focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 disabled:opacity-60 disabled:cursor-not-allowed"
                        placeholder="10 digit number"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {withdrawError && (
                    <div className="px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600 font-bold flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      {withdrawError}
                    </div>
                  )}

                  {withdrawSuccess && (
                    <div className="px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-600 font-bold flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      {withdrawSuccess}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isWithdrawing || isBlocked || !withdrawAmount || !withdrawBankCode || !withdrawAccountNumber}
                    className="w-full py-5 bg-gray-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-xl shadow-gray-900/10 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isWithdrawing ? 'Processing securely…' : 'Withdraw to Bank'}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Transactions */}
        <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink-0 mx-auto lg:mx-0">
          <div className="bg-white rounded-[2rem] border border-gray-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full min-h-[400px]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Recent Transactions</h2>

            {isLoadingLedger ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-100 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                      <div className="h-3 bg-gray-50 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : ledgerData && ledgerData.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {ledgerData.slice().reverse().map((tx: any) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {tx.type === 'credit' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          {tx.category === 'funding' ? 'Wallet Top-up' :
                            tx.category === 'withdrawal' ? 'Withdrawal to Bank' :
                              tx.category === 'transfer' ? (tx.type === 'credit' ? 'Transfer Received' : 'Transfer Sent') :
                                'Transaction'}
                        </p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">
                          {new Date(tx.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          {tx.counterparty_name && ` • ${tx.counterparty_name}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-sm ${tx.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'}`}>
                        {tx.type === 'credit' ? '+' : '-'}₦{(Number(tx.amount) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className={`text-[10px] font-bold mt-1 uppercase ${tx.status === 'success' ? 'text-emerald-500' :
                        tx.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                        }`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm font-bold text-gray-500">No transactions yet</p>
                <p className="text-xs font-medium text-gray-400 mt-1">Your activity will show up here</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Transfers;
