import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Hero Section */}
      <main className="min-h-[70vh] flex items-center overflow-hidden relative">
        {/* Background Blobs */}
        <div className="absolute top-0 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Money management, <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">reimagined.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Experience the future of personal finance with demoCredit. Fast, secure, and transparent credit solutions tailored for your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200 shadow-xl shadow-gray-200 active:scale-95 active:translate-y-0"
              >
                Join Now — It's Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-10 py-4 border border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 active:translate-y-0"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
