import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

const AllUsers = () => {
  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333' // Dark charcoal
  };

  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'James Wilson', email: 'james@example.com', role: 'Admin' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Tailor' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Customer' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', role: 'Tailor' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...editForm } : user
    ));
    setEditingUserId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleAddNew = () => {
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: '',
      email: '',
      role: 'Customer'
    };
    setUsers([...users, newUser]);
    handleEdit(newUser);
  };

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
            Manage all system users and their permissions
          </p>
        </motion.header>

        {/* Search and Add New */}
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
          
          <motion.button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-lg font-medium flex items-center"
            style={{ 
              backgroundColor: COLORS.primary,
              color: 'white'
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus className="mr-2" />
            Add New User
          </motion.button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ divideColor: '#E0D6C9' }}>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUserId === user.id ? (
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
                      {editingUserId === user.id ? (
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
                      {editingUserId === user.id ? (
                        <select
                          name="role"
                          value={editForm.role}
                          onChange={handleEditChange}
                          className="w-full px-3 py-1 rounded border"
                          style={{ 
                            borderColor: COLORS.primary,
                            backgroundColor: '#FCFAF7'
                          }}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Tailor">Tailor</option>
                          <option value="Customer">Customer</option>
                        </select>
                      ) : (
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'Tailor' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingUserId === user.id ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleSave(user.id)}
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
                            onClick={() => handleDelete(user.id)}
                            className="p-2 rounded-full hover:bg-red-50"
                            style={{ color: '#DC2626' }}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AllUsers;