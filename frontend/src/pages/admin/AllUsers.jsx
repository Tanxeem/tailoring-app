import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiTrash2, FiSearch, FiLock, FiEdit } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../App';

const AllUsers = () => {
  const COLORS = {
    primary: '#8B6B4A',
    secondary: '#4A4B8B',
    accent: '#C19A6B',
    background: '#F8F5F0',
    text: '#333333'
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/v1/user/allusers`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (!response.data?.user) throw new Error('Invalid data format');
      setUsers(response.data.user);
    } catch (error) {
      console.error('Fetch users error:', error);
      setError(error.message);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(
        `${backendUrl}/api/v1/user/remove/${id}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleChangePassword = (userId) => {
    navigate(`/admin/users/change-password/${userId}`);
  };

  const filteredUsers = users.filter(user => {
    const nameMatch = user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" style={{ borderColor: COLORS.primary }}></div>
          <p className="mt-2" style={{ color: COLORS.primary }}>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h3 className="text-lg font-medium mb-2" style={{ color: COLORS.primary }}>Error Loading Users</h3>
          <p className="mb-4" style={{ color: COLORS.text }}>{error}</p>
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: COLORS.primary,
              color: 'white'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.header
          className="mb-6 md:mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide" style={{ color: COLORS.primary }}>
            User Management
          </h1>
          <p className="text-xs md:text-sm mt-1 md:mt-2" style={{ color: COLORS.text }}>
            Manage all system users
          </p>
        </motion.header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 md:gap-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-1 text-sm md:text-base"
              style={{ 
                borderColor: '#E0D6C9',
                backgroundColor: '#FCFAF7'
              }}
            />
            <FiSearch className="absolute left-3 top-2.5 md:top-3 text-gray-400" />
          </div>
        </div>

        <motion.div
          className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#E0D6C9' }}>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: '#E0D6C9' }}>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center" style={{ color: COLORS.text }}>
                      {users.length === 0 ? 'No users found' : 'No matching users found'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}20` }}>
                            <FiUser style={{ color: COLORS.primary }} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium" style={{ color: COLORS.text }}>{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: COLORS.text }}>
                          <div className="flex items-center">
                            <FiMail className="mr-2 text-gray-400" />
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: COLORS.text }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleChangePassword(user._id)}
                            className="px-3 py-1 rounded text-white text-sm"
                            style={{ backgroundColor: COLORS.primary }}
                          >
                            Change Password
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 rounded-full hover:bg-red-50"
                            style={{ color: '#DC2626' }}
                            title="Delete User"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center" style={{ color: COLORS.text }}>
                {users.length === 0 ? 'No users found' : 'No matching users found'}
              </div>
            ) : (
              <div className="divide-y" style={{ divideColor: '#E0D6C9' }}>
                {filteredUsers.map(user => (
                  <div key={user._id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}20` }}>
                          <FiUser style={{ color: COLORS.primary }} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium" style={{ color: COLORS.text }}>{user.name}</div>
                          <div className="text-xs mt-1 flex items-center" style={{ color: COLORS.text }}>
                            <FiMail className="mr-1 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="text-xs mt-1" style={{ color: COLORS.text }}>
                            Created: {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleChangePassword(user._id)}
                          className="p-1.5 rounded-full"
                          style={{ 
                            backgroundColor: `${COLORS.primary}20`,
                            color: COLORS.primary
                          }}
                          title="Change Password"
                        >
                          <FiLock size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-1.5 rounded-full hover:bg-red-50"
                          style={{ color: '#DC2626' }}
                          title="Delete User"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllUsers;