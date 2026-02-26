import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLoginMutation } from '../services/auth';
import { setCredentials } from '../store/slices/userSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setApiError(null);
      try {
        const result = await login(values).unwrap();
        dispatch(setCredentials({ user: result.response.user }));
        navigate('/');
      } catch (err: any) {
        const message =
          err?.data?.message || err?.data?.error || 'Invalid credentials. Please try again.';
        setApiError(message);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left decorative panel */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden items-center justify-center p-16">
          {/* Static colour accents — no pulse */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-700 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-700 rounded-full blur-3xl opacity-20" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900">
              <span className="text-white font-black text-3xl select-none">D</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
              Welcome
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic"> back.</span>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
              Sign in to access your wallet, send funds, and track your finances — all in one place.
            </p>

            {/* Feature pills */}
            <div className="mt-10 flex flex-col gap-3 text-left">
              {[
                { icon: '⚡', text: 'Instant transfers & payments' },
                { icon: '🛡️', text: 'Bank-level security' },
                { icon: '💎', text: 'Zero hidden fees, ever' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-white font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex items-center justify-center px-6 py-24 sm:px-12 lg:px-20 relative overflow-hidden">
          {/* Subtle background accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60 -z-10" />

          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-10">
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Sign In</p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight mb-3">
                Good to see<br />you again
              </h1>
              <p className="text-gray-500 font-medium">Enter your credentials to continue.</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.email && formik.errors.email
                    ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  placeholder="name@company.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.email}</p>
                ) : null}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps('password')}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.password && formik.errors.password
                    ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  placeholder="••••••••"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.password}</p>
                ) : null}
              </div>

              {/* API error */}
              {apiError && (
                <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-600 font-semibold mb-2">
                  {apiError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-4 mt-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {formik.isSubmitting ? 'Signing in…' : 'Sign In →'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Sign up link */}
              <p className="text-center text-sm text-gray-500 font-medium">
                New to demoCredit?{' '}
                <Link to="/signup" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  Create a free account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
