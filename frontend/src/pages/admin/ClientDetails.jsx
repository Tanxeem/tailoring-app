import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiPhone, FiMapPin, FiMail, 
  FiEdit2, FiTrash2, FiChevronLeft, 
  FiScissors, FiCalendar 
} from 'react-icons/fi';
import { CiRuler } from 'react-icons/ci';
import axios from 'axios';
import { toast } from 'react-toastify';
import {backendUrl} from '../../App';

const ClientDetails = () => {
  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333' // Dark charcoal
  };

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    shoulder: '',
    chest: '',
    waist: '',
    hips: '',
    sleeveLength: '',
    length: '',
    neck: '',
    cuff: '',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/v1/admin/client-details`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      if(response.status === 200) {
        setClients(response.data.clients);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(error.response?.data?.message || 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDetails();
  }, []);

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.includes(searchTerm) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setEditForm({ 
      ...client // Directly spread all properties including measurements
    });
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await axios.put(
        `${backendUrl}/api/v1/admin/update/${selectedClient._id}`,
        editForm,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      
      if(response.status === 200) {
        setClients(clients.map(client => 
          client._id === selectedClient._id ? response.data.client : client
        ));
        setSelectedClient({
          ...response.data.client,
          updatedAt: new Date().toISOString() 
        });
        setIsEditing(false);
        toast.success('Client updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update client');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await axios.delete(
          `${backendUrl}/api/v1/admin/remove/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        );
        
        if(response.status === 200) {
          setClients(clients.filter(client => client._id !== id));
          if (selectedClient && selectedClient._id === id) {
            setSelectedClient(null);
          }
          toast.success('Client deleted successfully');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete client');
        console.error(error);
      }
    }
  };

  // Measurement fields to display
  const measurementFields = [
    { key: 'shoulder', label: 'Shoulder' },
    { key: 'chest', label: 'Chest' },
    { key: 'waist', label: 'Waist' },
    { key: 'hips', label: 'Hips' },
    { key: 'sleeveLength', label: 'Sleeve Length' },
    { key: 'length', label: 'Length' },
    { key: 'neck', label: 'Neck' },
    { key: 'cuff', label: 'Cuff' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" style={{ borderColor: COLORS.primary }}></div>
          <p className="mt-2" style={{ color: COLORS.primary }}>Loading clients...</p>
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
            {/* Search  */}
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
            </div>

            {/* Clients Table */}
            {filteredClients.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <p style={{ color: COLORS.text }}>No clients found</p>
              </div>
            ) : (
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
                          key={client._id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleSelectClient(client)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}20` }}>
                                <FiUser style={{ color: COLORS.primary }} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium" style={{ color: COLORS.text }}>{client.customerName}</div>
                                <div className="text-xs" style={{ color: COLORS.accent }}>{client.address?.split(',')[0]}</div>
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
                            {new Date(client.createdAt).toLocaleDateString()}
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
                                  handleDelete(client._id);
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
            )}
          </motion.div>
        )}

        {/* Client Detail View */}
        {selectedClient && (
          <AnimatePresence>
            <motion.div
              key={selectedClient._id}
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
                    onClick={() => handleDelete(selectedClient._id)}
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
                      name="customerName"
                      value={editForm.customerName || ''}
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
                      {selectedClient.customerName}
                    </h1>
                  )}
                  <div className="flex items-center mt-2">
  <span className="text-sm flex items-center" style={{ color: COLORS.text }}>
    <FiCalendar className="mr-1" />
    Created: {new Date(selectedClient.createdAt).toLocaleDateString()}
    {selectedClient.updatedAt && (
      <>
        <span className="mx-2">•</span>
        Updated: {new Date(selectedClient.updatedAt).toLocaleDateString()}
      </>
    )}
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
                                value={editForm.phone || ''}
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
                              {selectedClient.phone || 'N/A'}
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
                                value={editForm.email || ''}
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
                              {selectedClient.email || 'N/A'}
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
                                value={editForm.address || ''}
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
                              {selectedClient.address || 'N/A'}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                            Notes
                          </label>
                          {isEditing ? (
                            <textarea
                              name="notes"
                              value={editForm.notes || ''}
                              onChange={handleEditChange}
                              className="w-full px-4 py-2 rounded-lg border"
                              style={{ 
                                borderColor: '#E0D6C9',
                                backgroundColor: '#FCFAF7',
                                minHeight: '80px'
                              }}
                            />
                          ) : (
                            <p className="flex items-start">
                              {selectedClient.notes || 'No notes available'}
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
                        {measurementFields.map(({ key, label }) => (
                          <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <label className="block text-xs font-medium uppercase tracking-wider mb-1 flex items-center" style={{ color: COLORS.text }}>
                              <CiRuler className="mr-1" />
                              {label}
                            </label>
                            {isEditing ? (
                              <input
                                type="number"
                                name={key} // Changed from measurements.key to just key
                                value={editForm[key] || ''}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 rounded border"
                                style={{ 
                                  borderColor: '#E0D6C9',
                                  backgroundColor: 'white'
                                }}
                              />
                            ) : (
                              <p className="text-lg font-light" style={{ color: COLORS.primary }}>
                                {selectedClient[key] || 'N/A'}
                              </p>
                            )}
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
  disabled={saving}
>
  {saving ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Saving...
    </>
  ) : (
    'Save Changes'
  )}
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