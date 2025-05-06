import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiMail, FiScissors, FiSave } from 'react-icons/fi';

const CreateMeasurement = () => {
  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333' // Dark charcoal
  };

  const [formData, setFormData] = useState({
    // Customer Information
    customerName: '',
    phone: '',
    address: '',
    email: '',
    
    // Measurements
    shoulder: '',
    chest: '',
    waist: '',
    hips: '',
    sleeveLength: '',
    length: '',
    neck: '',
    cuff: '',
    
    // Additional Info
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Measurement created:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Form Header */}
        <motion.header
          className="mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-serif font-bold tracking-wide" style={{ color: COLORS.primary }}>
            Bespoke Measurement Form
          </h1>
          <p className="text-sm mt-2" style={{ color: COLORS.text }}>
            Precision Tailoring • All measurements in centimeters
          </p>
        </motion.header>

        {/* Measurement Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl overflow-hidden p-8"
          style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Client Details Section */}
          <div className="mb-12">
            <h2 className="text-xl font-serif font-medium mb-6 flex items-center" style={{ color: COLORS.primary }}>
              <FiUser className="mr-2" /> Client Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                    style={{ 
                      borderColor: '#E0D6C9',
                      backgroundColor: '#FCFAF7'
                    }}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                    style={{ 
                      borderColor: '#E0D6C9',
                      backgroundColor: '#FCFAF7'
                    }}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                    style={{ 
                      borderColor: '#E0D6C9',
                      backgroundColor: '#FCFAF7'
                    }}
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                    style={{ 
                      borderColor: '#E0D6C9',
                      backgroundColor: '#FCFAF7',
                      minHeight: '80px'
                    }}
                    placeholder="123 Fashion Ave, Suite 456"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Precise Measurements Section */}
          <div>
            <h2 className="text-xl font-serif font-medium mb-6 flex items-center" style={{ color: COLORS.primary }}>
              <FiScissors className="mr-2" /> Precise Measurements
            </h2>
            
            <div className="space-y-8">
              {/* Upper Body */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: COLORS.primary }}>
                  Upper Body
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                      Shoulder
                    </label>
                    <input
                      type="number"
                      name="shoulder"
                      value={formData.shoulder}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="42"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                      Chest
                    </label>
                    <input
                      type="number"
                      name="chest"
                      value={formData.chest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="98"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                      Neck
                    </label>
                    <input
                      type="number"
                      name="neck"
                      value={formData.neck}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="38"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Mid Body */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: COLORS.primary }}>
                  Mid Body
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                     Waist
                    </label>
                    <input
                      type="number"
                      name="waist"
                      value={formData.waist}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="82"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                     Hips
                    </label>
                    <input
                      type="number"
                      name="hips"
                      value={formData.hips}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="96"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Lengths */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: COLORS.primary }}>
                  Lengths
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                     Sleeve
                    </label>
                    <input
                      type="number"
                      name="sleeveLength"
                      value={formData.sleeveLength}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="64"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                     Length
                    </label>
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="76"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center" style={{ color: COLORS.text }}>
                     Cuff
                    </label>
                    <input
                      type="number"
                      name="cuff"
                      value={formData.cuff}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                      style={{ 
                        borderColor: '#E0D6C9',
                        backgroundColor: '#FCFAF7'
                      }}
                      placeholder="24"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Special Instructions
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: '#E0D6C9',
                    backgroundColor: '#FCFAF7',
                    minHeight: '100px'
                  }}
                  placeholder="Fabric preferences, special requests, etc."
                />
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
            <motion.button
              type="submit"
              className="px-8 py-3 rounded-lg font-medium flex items-center transition-all"
              style={{ 
                backgroundColor: COLORS.primary,
                color: 'white'
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 4px 12px rgba(139, 107, 74, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FiSave className="mr-2" />
              Save Measurement Record
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CreateMeasurement;