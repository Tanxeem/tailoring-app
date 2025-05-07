import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit2, FiTrash2, FiSearch, FiLock } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllUsers = () => {
  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333' // Dark charcoal
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    email: '', 
    createdAt: '',
    password: '',
    confirmPassword: ''
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3000/api/v1/user/allusers', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // Validate response structure
      if (!response.data || !Array.isArray(response.data.user)) {
        throw new Error('Invalid data format from API');
      }

      setUsers(response.data.user);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
      toast.error('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Safe filtering of users
  const filteredUsers = users.filter(user => {
    const nameMatch = user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({ 
      name: user.name, 
      email: user.email, 
      createdAt: user.createdAt?.slice(0,10),
      password: '',
      confirmPassword: '' 
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      // Validate required fields
      if (!editForm.name || !editForm.email) {
        toast.error('Name and email are required');
        return;
      }

      // Validate passwords if being changed
      if (editForm.password && editForm.password !== editForm.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      // Prepare update data
      const updateData = {
        name: editForm.name,
        email: editForm.email
      };

      // Only include password if it's being updated
      if (editForm.password) {
        updateData.password = editForm.password;
      }

      // API call to update user
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/updatepassword/${id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      // Validate response
      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      // Update local state
      setUsers(users.map(user => 
        user._id === id ? response.data.user : user
      ));
      setEditingUserId(null);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/user/remove/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      
      // Update local state
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

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
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.header
          className="mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-serif font-bold tracking-wide" style={{ color: COLORS.primary }}>
            User Management
          </h1>
          <p className="text-sm mt-2" style={{ color: COLORS.text }}>
            Manage all system users
          </p>
        </motion.header>

        {/* Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-1"
              style={{ 
                borderColor: '#E0D6C9',
                backgroundColor: '#FCFAF7'
              }}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Users Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto">
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
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            className="w-full px-3 py-1 rounded border"
                            style={{ 
                              borderColor: COLORS.primary,
                              backgroundColor: '#FCFAF7'
                            }}
                          />
                        ) : (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}20` }}>
                              <FiUser style={{ color: COLORS.primary }} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium" style={{ color: COLORS.text }}>{user.name}</div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUserId === user._id ? (
                          <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditChange}
                            className="w-full px-3 py-1 rounded border"
                            style={{ 
                              borderColor: COLORS.primary,
                              backgroundColor: '#FCFAF7'
                            }}
                          />
                        ) : (
                          <div className="text-sm" style={{ color: COLORS.text }}>
                            <div className="flex items-center">
                              <FiMail className="mr-2 text-gray-400" />
                              {user.email}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            name="createdAt"
                            value={editForm.createdAt}
                            onChange={handleEditChange}
                            className="w-full px-3 py-1 rounded border"
                            style={{ 
                              borderColor: COLORS.primary,
                              backgroundColor: '#FCFAF7'
                            }}
                            disabled
                          />
                        ) : (
                          <div className="text-sm" style={{ color: COLORS.text }}>
                            {user.createdAt?.slice(0,10)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingUserId === user._id ? (
                          <div className="flex flex-col space-y-2 items-end">
                            {/* Password Fields */}
                            <div className="w-full max-w-xs">
                              <div className="relative">
                                <input
                                  type="password"
                                  name="password"
                                  value={editForm.password}
                                  onChange={handleEditChange}
                                  placeholder="New password"
                                  className="w-full pl-10 pr-4 py-2 rounded border"
                                  style={{ 
                                    borderColor: COLORS.primary,
                                    backgroundColor: '#FCFAF7'
                                  }}
                                />
                                <FiLock className="absolute left-3 top-3 text-gray-400" />
                              </div>
                            </div>
                            <div className="w-full max-w-xs">
                              <div className="relative">
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  value={editForm.confirmPassword}
                                  onChange={handleEditChange}
                                  placeholder="Confirm password"
                                  className="w-full pl-10 pr-4 py-2 rounded border"
                                  style={{ 
                                    borderColor: COLORS.primary,
                                    backgroundColor: '#FCFAF7'
                                  }}
                                />
                                <FiLock className="absolute left-3 top-3 text-gray-400" />
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex space-x-2 mt-2">
                              <button
                                onClick={() => handleSave(user._id)}
                                className="px-3 py-1 rounded text-white text-sm"
                                style={{ backgroundColor: COLORS.primary }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingUserId(null)}
                                className="px-3 py-1 rounded border text-sm"
                                style={{ 
                                  borderColor: '#E0D6C9',
                                  color: COLORS.text
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="p-2 rounded-full hover:bg-gray-100"
                              style={{ color: COLORS.primary }}
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="p-2 rounded-full hover:bg-red-50"
                              style={{ color: '#DC2626' }}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllUsers;