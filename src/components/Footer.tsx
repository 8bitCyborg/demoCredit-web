import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl select-none">D</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">demoCredit</span>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed font-medium">
              Designing the next generation of financial freedom. Simple, fast, and accessible credit for everyone.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">API Status</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} demoCredit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
