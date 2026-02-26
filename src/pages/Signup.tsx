import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bvn: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string()
        .matches(/^[0-9+\s()-]{7,15}$/, 'Invalid phone number')
        .required('Required'),
      bvn: Yup.string()
        .matches(/^[0-9]{11}$/, 'BVN must be 11 digits')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Mock Signup:', values);
      alert('Signed up successfully (Mock)');
      navigate('/login');
    },
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left form panel */}
        <div className="flex-1 flex items-center justify-center px-6 py-24 sm:px-12 lg:px-20 relative overflow-hidden">
          {/* Subtle background accents */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 -z-10" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />

          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-10">
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Get Started</p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight mb-3">
                Create your<br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">free account</span>
              </h1>
              <p className="text-gray-500 font-medium">Join thousands managing their finances with demoCredit.</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps('firstName')}
                    className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.firstName && formik.errors.firstName
                      ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                      }`}
                    placeholder="John"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.firstName}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps('lastName')}
                    className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.lastName && formik.errors.lastName
                      ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                      }`}
                    placeholder="Doe"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.lastName}</p>
                  ) : null}
                </div>
              </div>

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

              {/* Phone & BVN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...formik.getFieldProps('phone')}
                    className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.phone && formik.errors.phone
                      ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                      }`}
                    placeholder="08012345678"
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.phone}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="bvn" className="block text-sm font-semibold text-gray-700 mb-2">
                    BVN
                  </label>
                  <input
                    id="bvn"
                    type="text"
                    inputMode="numeric"
                    maxLength={11}
                    {...formik.getFieldProps('bvn')}
                    className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.bvn && formik.errors.bvn
                      ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                      }`}
                    placeholder="11-digit BVN"
                  />
                  {formik.touched.bvn && formik.errors.bvn ? (
                    <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.bvn}</p>
                  ) : null}
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps('password')}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.password && formik.errors.password
                    ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  placeholder="At least 6 characters"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.password}</p>
                ) : null}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium transition-all focus:outline-none focus:bg-white ${formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  placeholder="••••••••"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <p className="mt-2 text-xs text-red-500 font-semibold">{formik.errors.confirmPassword}</p>
                ) : null}
              </div>

              {/* Terms note */}
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                By creating an account you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline font-semibold">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {formik.isSubmitting ? 'Creating account…' : 'Create Account →'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Login link */}
              <p className="text-center text-sm text-gray-500 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  Sign in instead
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right decorative panel */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden items-center justify-center p-16">
          {/* Static colour accents — no pulse */}
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-700 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-700 rounded-full blur-3xl opacity-20" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900">
              <span className="text-white font-black text-3xl select-none">D</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
              Money management, &nbsp;
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">reimagined.</span>
            </h2>
            <p className="text-gray-300 font-medium leading-relaxed max-w-xs mx-auto">
              Fast, secure, and transparent credit solutions. Join thousands already using demoCredit.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: '50K+', label: 'Users' },
                { value: '$2M+', label: 'Transacted' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 border border-white/20 rounded-2xl px-3 py-4">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-gray-300 font-semibold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
