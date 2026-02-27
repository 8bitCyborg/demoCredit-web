import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/userSlice';

const Profile: React.FC = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Profile</h1>
      <p className="text-gray-500 font-medium mb-10">Manage your personal information and preferences.</p>

      {user && (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Full Name</p>
              <p className="text-lg font-bold text-gray-900">{user.first_name} {user.last_name}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-lg font-bold text-gray-900">{user.email}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Phone Number</p>
              <p className="text-lg font-bold text-gray-900">{user.phone}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">BVN</p>
              <p className="text-lg font-bold text-gray-900">{user.bvn}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
