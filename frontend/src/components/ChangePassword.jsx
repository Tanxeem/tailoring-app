import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../App';

const ChangePassword = () => {
  // Define color variables
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze color
    primaryDark: '#6B4A2A', // Darker shade for hover
    text: '#333333', // Dark text
    border: '#E0D6C9', // Light border
    background: '#F8F5F0' // Cream background
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Both password fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${backendUrl}/api/v1/user/updatepassword/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Password update failed');
      }

      toast.success('Password updated successfully');
      navigate('/admin/users');
    } catch (error) {
      console.error('Password update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: COLORS.primary }}>
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded border focus:outline-none focus:ring-1"
                style={{ 
                  borderColor: COLORS.border,
                  backgroundColor: '#FCFAF7',
                  color: COLORS.text
                }}
                required
              />
              <FiLock className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded border focus:outline-none focus:ring-1"
                style={{ 
                  borderColor: COLORS.border,
                  backgroundColor: '#FCFAF7',
                  color: COLORS.text
                }}
                required
              />
              <FiLock className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="px-4 py-2 rounded border hover:bg-gray-100 transition-colors"
              style={{ 
                borderColor: COLORS.border,
                color: COLORS.text
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white hover:bg-opacity-90 transition-colors flex items-center justify-center"
              style={{ 
                backgroundColor: COLORS.primary,
                minWidth: '150px'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;