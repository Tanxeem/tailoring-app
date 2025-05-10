import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, PieChart, LineChart,
  Bar, Pie, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import {
  FiUsers, FiScissors, FiUser, FiEdit,
  FiClipboard, FiTrendingUp, FiMail,
  FiPhone, FiMapPin, FiChevronDown,
  FiChevronUp, FiCalendar
} from 'react-icons/fi';
import { backendUrl } from '../../App';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('customers');
  const [adminUsers, setAdminUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333', // Dark charcoal
    admin: '#6B4A8B', // Purple for admin
    customer: '#4A8B6B' // Green for customers
  };

  // Toggle measurement details
  const toggleCustomerExpand = (customerId) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  // Fetch all users (admin users)
  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/user/allusers`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      if (response.data && response.data.users) {
        setAdminUsers(response.data.users);
      } else {
        setAdminUsers([]);
        setError('No admin users found');
      }
    } catch (err) {
      setError('Failed to load admin users');
      console.error('Error fetching admin users:', err);
      setAdminUsers([]);
    }
  };

  // Fetch customer data
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/admin/client-details`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      if (response.data && response.data.clients) {
        setCustomers(response.data.clients);
      } else {
        setCustomers([]);
        setError('No clients found');
      }
    } catch (err) {
      setError('Failed to load customer data');
      console.error('Error fetching customers:', err);
      setCustomers([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchAdminUsers(), fetchCustomers()]);
      } catch (err) {
        setError('Failed to load dashboard data');
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Process customer data for charts
  const processCustomerData = () => {
    if (!customers || customers.length === 0) return [];

    const monthlyData = customers.reduce((acc, customer) => {
      const date = new Date(customer.createdAt || customer.createdDate || Date.now());
      const month = date.toLocaleString('default', { month: 'short' });
      
      if (!acc[month]) {
        acc[month] = { month, customers: 0, measurements: 0 };
      }
      
      acc[month].customers += 1;
      acc[month].measurements += 9; // Assuming 9 measurements per customer
      
      return acc;
    }, {});

    return Object.values(monthlyData).slice(-5);
  };

  const chartData = processCustomerData();

  // Summary stats
  const summaryStats = [
    {
      title: "Users",
      value: adminUsers.length,
      icon: <FiUser className="text-2xl" />,
      color: COLORS.admin,
      trend: "static"
    },
    {
      title: "Total Customers",
      value: customers.length,
      icon: <FiUsers className="text-2xl" />,
      color: COLORS.customer,
      // trend: customers.length > 0 ? `${Math.round((customers.length / 30) * 100)}% ↑` : "0%"
    },
    {
      title: "Total Measurements",
      value: customers.length, 
      icon: <FiScissors className="text-2xl" />,
      color: COLORS.primary,
      // trend: customers.length > 0 ? `${Math.round((customers.length / 10) * 100)}% ↑` : "0%"
    }
  ];

  // Show only first 5 customers initially
  const displayedCustomers = customers.slice(0, 5);

  const renderMainChart = () => {
    if (activeTab === 'users') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4" style={{ color: COLORS.admin }}>
              Admin Users
            </h3>
            <div className="space-y-4">
              {adminUsers.map((user) => (
                <div key={user._id} className="flex items-center p-3 border rounded-lg">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${COLORS.admin}20`, color: COLORS.admin }}>
                    <FiUser />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4" style={{ color: COLORS.admin }}>
              Admin Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Active Admins', value: adminUsers.length },
                      { name: 'Available Slots', value: Math.max(0, 5 - adminUsers.length) }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    <Cell fill={COLORS.admin} />
                    <Cell fill="#E0D6C9" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorMeasurements" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.customer} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.customer} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0D6C9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: COLORS.text, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: COLORS.text, fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.96)',
                border: `1px solid ${COLORS.primary}`,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="measurements"
              stroke="url(#colorMeasurements)"
              strokeWidth={3}
              dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: COLORS.primary }}
              animationDuration={1800}
            />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="url(#colorCustomers)"
              strokeWidth={3}
              dot={{ fill: COLORS.customer, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: COLORS.customer }}
              animationDuration={1800}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  const renderCustomerMeasurements = (customer) => {
    const measurementFields = [
      { name: 'Shoulder', value: customer.shoulder, icon: null },
      { name: 'Chest', value: customer.chest, icon: null },
      { name: 'Waist', value: customer.waist, icon: null },
      { name: 'Hips', value: customer.hips, icon: null },
      { name: 'Sleeve', value: customer.sleeveLength, icon: null },
      { name: 'Length', value: customer.length, icon: null },
      { name: 'Neck', value: customer.neck, icon: null },
      { name: 'Cuff', value: customer.cuff, icon: null }
    ].filter(m => m.value !== undefined);

    return (
      <AnimatePresence>
        {expandedCustomer === customer._id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <FiMail className="mr-2 text-gray-500" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-2 text-gray-500" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                {customer.address && (
                  <div className="flex items-center col-span-2">
                    <FiMapPin className="mr-2 text-gray-500" />
                    <span className="text-sm truncate">{customer.address}</span>
                  </div>
                )}
              </div>

              <h4 className="text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                Measurements
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {measurementFields.map((m, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg flex items-center">
                    {m.icon && <span className="mr-2">{m.icon}</span>}
                    <div>
                      <p className="text-xs text-gray-500">{m.name}</p>
                      <p className="font-medium">{m.value}"</p>
                    </div>
                  </div>
                ))}
              </div>

              {customer.notes && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                    Notes
                  </h4>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{customer.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide" style={{ color: COLORS.primary }}>
            Tailoring Atelier Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: COLORS.text }}>
            {activeTab === 'users' ? 'Admin Management' : 'Customer Measurements'}
          </p>
        </motion.header>

        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {summaryStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border-l-4 relative overflow-hidden"
              style={{ 
                borderLeftColor: stat.color,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider" style={{ color: COLORS.text }}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-light mt-2" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {stat.trend !== "static" && (
                    <span className="text-sm font-medium" style={{ color: COLORS.accent }}>
                      {stat.trend}
                    </span>
                  )}
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${stat.color}10`, color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-red-500 mb-4">Error</div>
              <p className="text-center">{error}</p>
              <button 
                onClick={() => {
                  setError(null);
                  setIsLoading(true);
                  Promise.all([fetchAdminUsers(), fetchCustomers()]).finally(() => setIsLoading(false));
                }}
                className="mt-4 px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: COLORS.primary }}
              >
                Retry
              </button>
            </motion.div>
          ) : isLoading ? (
            <motion.div
              className="flex flex-col items-center justify-center h-96"
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-t-transparent"
                style={{ borderColor: COLORS.primary }}
              />
              <p className="mt-4 text-sm" style={{ color: COLORS.text }}>
                Loading tailoring data...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-8 p-1 rounded-xl bg-white shadow-inner" style={{ maxWidth: 'fit-content' }}>
                {['users', 'customers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab
                        ? 'text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    style={{
                      backgroundColor: activeTab === tab ? 
                        (tab === 'users' ? COLORS.admin : COLORS.customer) 
                        : 'transparent'
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Chart Section */}
              <div 
                className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8"
                style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif font-medium" style={{ color: COLORS.primary }}>
                      {activeTab === 'users' ? 'Admin Overview' : 'Customer & Measurements Trend'}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-xs" style={{ color: COLORS.text }}>
                        {activeTab === 'users' ? 'Current Status' : 'Last 5 Months'}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    layout
                    className={activeTab === 'users' ? '' : 'h-80'}
                  >
                    {renderMainChart()}
                  </motion.div>
                </div>
              </div>

              {/* Customer/User Details */}
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-medium mb-4 flex items-center" style={{ color: COLORS.primary }}>
                      {activeTab === 'users' ? (
                        <><FiUser className="mr-2" /> Admin Users</>
                      ) : (
                        <><FiClipboard className="mr-2" /> Customer Details</>
                      )}
                    </h3>
                    
                    {activeTab === 'users' ? (
                      <div className="space-y-4">
                        {adminUsers.map((user) => (
                          <motion.div
                            key={user._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
                              style={{ backgroundColor: `${COLORS.admin}20`, color: COLORS.admin }}>
                              <FiUser className="text-xl" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <button className="ml-4 p-2 rounded-full hover:bg-gray-100">
                              <FiEdit className="text-gray-500" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {displayedCustomers.map((customer) => (
                          <motion.div
                            key={customer._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="border rounded-lg overflow-hidden"
                          >
                            <div 
                              className="p-6 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
                              onClick={() => toggleCustomerExpand(customer._id)}
                            >
                              <div>
                                <h4 className="font-medium text-xl">{customer.customerName}</h4>
                                <p className="text-sm text-gray-500">
                                  Created on {new Date(customer.createdAt || customer.createdDate || Date.now()).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <button 
                                  className="p-2 rounded-full hover:bg-gray-100 mr-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Edit functionality here
                                  }}
                                >
                                  <FiEdit className="text-gray-500" />
                                </button>
                                {expandedCustomer === customer._id ? (
                                  <FiChevronUp className="text-gray-500" />
                                ) : (
                                  <FiChevronDown className="text-gray-500" />
                                )}
                              </div>
                            </div>
                            {renderCustomerMeasurements(customer)}
                          </motion.div>
                        ))}

                        {customers.length > 5 && (
                          <div className="flex justify-center mt-6">
                            <button
                              onClick={() => navigate('/admin/client-details')}
                              className="px-6 py-3 rounded-lg text-white flex items-center"
                              style={{ backgroundColor: COLORS.primary }}
                            >
                              Show All Customers
                              <FiChevronDown className="ml-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;