import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiPhone, FiMapPin, FiMail, 
  FiEdit2, FiTrash2, FiChevronLeft, 
  FiScissors, FiCalendar, FiPlus 
} from 'react-icons/fi';
import { CiRuler } from 'react-icons/ci';

const ClientDetails = () => {
  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333' // Dark charcoal
  };

  // Sample client data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'James Wilson',
      phone: '+1 (555) 123-4567',
      email: 'james@example.com',
      address: '123 Fashion Ave, New York, NY',
      createdDate: '2023-01-15',
      measurements: {
        shoulder: 42,
        chest: 98,
        waist: 82,
        hips: 96,
        sleeveLength: 64,
        length: 76,
        neck: 38,
        cuff: 24
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      email: 'sarah@example.com',
      address: '456 Tailor St, Boston, MA',
      createdDate: '2023-02-20',
      measurements: {
        shoulder: 38,
        chest: 92,
        waist: 76,
        hips: 94,
        sleeveLength: 62,
        length: 74,
        neck: 36,
        cuff: 22
      }
    }
  ]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setEditForm({ ...client });
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setClients(clients.map(client => 
      client.id === selectedClient.id ? editForm : client
    ));
    setSelectedClient(editForm);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id));
      if (selectedClient && selectedClient.id === id) {
        setSelectedClient(null);
      }
    }
  };

  const handleAddNew = () => {
    const newClient = {
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      name: '',
      phone: '',
      email: '',
      address: '',
      createdDate: new Date().toISOString().split('T')[0],
      measurements: {
        shoulder: '',
        chest: '',
        waist: '',
        hips: '',
        sleeveLength: '',
        length: '',
        neck: '',
        cuff: ''
      }
    };
    setClients([...clients, newClient]);
    handleSelectClient(newClient);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Header */}
        <motion.header
          className="mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-serif font-bold tracking-wide" style={{ color: COLORS.primary }}>
            {selectedClient ? 'Client Details' : 'Client Manager'}
          </h1>
          <p className="text-sm mt-2" style={{ color: COLORS.text }}>
            {selectedClient ? 'View and edit client measurements' : 'Manage your tailoring clients'}
          </p>
        </motion.header>

        {/* Client List View */}
        {!selectedClient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Search and Add New */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: '#E0D6C9',
                    backgroundColor: '#FCFAF7'
                  }}
                />
                <FiUser className="absolute left-3 top-3 text-gray-400" />
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
                Add New Client
              </motion.button>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: '#E0D6C9' }}>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Created</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.primary }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ divideColor: '#E0D6C9' }}>
                    {filteredClients.map(client => (
                      <tr 
                        key={client.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelectClient(client)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}20` }}>
                              <FiUser style={{ color: COLORS.primary }} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium" style={{ color: COLORS.text }}>{client.name}</div>
                              <div className="text-xs" style={{ color: COLORS.accent }}>{client.address.split(',')[0]}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: COLORS.text }}>
                          {client.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: COLORS.text }}>
                          {client.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: COLORS.text }}>
                          {client.createdDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectClient(client);
                                setIsEditing(true);
                              }}
                              className="p-2 rounded-full hover:bg-gray-100"
                              style={{ color: COLORS.primary }}
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(client.id);
                              }}
                              className="p-2 rounded-full hover:bg-red-50"
                              style={{ color: '#DC2626' }}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Client Detail View */}
        {selectedClient && (
          <AnimatePresence>
            <motion.div
              key={selectedClient.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back and Action Buttons */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setSelectedClient(null)}
                  className="flex items-center text-sm font-medium"
                  style={{ color: COLORS.primary }}
                >
                  <FiChevronLeft className="mr-1" />
                  Back to Clients
                </button>
                
                <div className="flex space-x-4">
                  <motion.button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 rounded-lg flex items-center"
                    style={{ 
                      backgroundColor: isEditing ? COLORS.accent : COLORS.primary,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiEdit2 className="mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleDelete(selectedClient.id)}
                    className="px-4 py-2 rounded-lg flex items-center bg-red-100"
                    style={{ color: '#DC2626' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiTrash2 className="mr-2" />
                    Delete
                  </motion.button>
                </div>
              </div>

              {/* Client Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Client Header */}
                <div 
                  className="p-6 border-b"
                  style={{ borderColor: '#E0D6C9', backgroundColor: '#FCFAF7' }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg border text-2xl font-serif font-bold"
                      style={{ 
                        borderColor: COLORS.primary,
                        backgroundColor: 'white',
                        color: COLORS.primary
                      }}
                    />
                  ) : (
                    <h1 className="text-2xl font-serif font-bold" style={{ color: COLORS.primary }}>
                      {selectedClient.name}
                    </h1>
                  )}
                  <div className="flex items-center mt-2">
                    <span className="text-sm flex items-center" style={{ color: COLORS.text }}>
                      <FiCalendar className="mr-1" />
                      Created: {selectedClient.createdDate}
                    </span>
                  </div>
                </div>

                {/* Client Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div>
                      <h2 className="text-lg font-serif font-medium mb-4" style={{ color: COLORS.primary }}>
                        Contact Information
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                            Phone
                          </label>
                          {isEditing ? (
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                name="phone"
                                value={editForm.phone}
                                onChange={handleEditChange}
                                className="pl-10 w-full px-4 py-2 rounded-lg border"
                                style={{ 
                                  borderColor: '#E0D6C9',
                                  backgroundColor: '#FCFAF7'
                                }}
                              />
                            </div>
                          ) : (
                            <p className="flex items-center">
                              <FiPhone className="mr-2 text-gray-400" />
                              {selectedClient.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                            Email
                          </label>
                          {isEditing ? (
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleEditChange}
                                className="pl-10 w-full px-4 py-2 rounded-lg border"
                                style={{ 
                                  borderColor: '#E0D6C9',
                                  backgroundColor: '#FCFAF7'
                                }}
                              />
                            </div>
                          ) : (
                            <p className="flex items-center">
                              <FiMail className="mr-2 text-gray-400" />
                              {selectedClient.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                            Address
                          </label>
                          {isEditing ? (
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                                <FiMapPin className="text-gray-400" />
                              </div>
                              <textarea
                                name="address"
                                value={editForm.address}
                                onChange={handleEditChange}
                                className="pl-10 w-full px-4 py-2 rounded-lg border"
                                style={{ 
                                  borderColor: '#E0D6C9',
                                  backgroundColor: '#FCFAF7',
                                  minHeight: '80px'
                                }}
                              />
                            </div>
                          ) : (
                            <p className="flex items-start">
                              <FiMapPin className="mr-2 mt-1 text-gray-400" />
                              {selectedClient.address.split('\n').map((line, i) => (
                                <span key={i}>
                                  {line}
                                  <br />
                                </span>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Measurements */}
                    <div>
                      <h2 className="text-lg font-serif font-medium mb-4 flex items-center" style={{ color: COLORS.primary }}>
                        <FiScissors className="mr-2" /> Measurements (cm)
                      </h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedClient.measurements).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <label className="block text-xs font-medium uppercase tracking-wider mb-1 flex items-center" style={{ color: COLORS.text }}>
                              <CiRuler className="mr-1" />
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <p className="text-lg font-light" style={{ color: COLORS.primary }}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button (when editing) */}
                {isEditing && (
                  <div className="p-6 border-t" style={{ borderColor: '#E0D6C9' }}>
                    <motion.button
                      onClick={handleSave}
                      className="w-full py-3 rounded-lg font-medium flex items-center justify-center"
                      style={{ 
                        backgroundColor: COLORS.primary,
                        color: 'white'
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: '0 4px 12px rgba(139, 107, 74, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Changes
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default ClientDetails;