import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, BarChart, PieChart, 
  Line, Bar, Pie, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { FiUsers, FiScissors, FiDollarSign, FiCalendar, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tailoring');

  // Luxury color palette
  const COLORS = {
    primary: '#8B6B4A', // Rich bronze
    secondary: '#4A4B8B', // Deep navy
    accent: '#C19A6B', // Gold
    background: '#F8F5F0', // Cream
    text: '#333333' // Dark charcoal
  };

  // Sample data - last 10 records
  const tailoringData = [
    { date: 'May 10', measurements: 21, alterations: 9, revenue: 420 },
    { date: 'May 9', measurements: 19, alterations: 7, revenue: 380 },
    { date: 'May 8', measurements: 17, alterations: 6, revenue: 340 },
    { date: 'May 7', measurements: 13, alterations: 8, revenue: 410 },
    { date: 'May 6', measurements: 20, alterations: 10, revenue: 500 },
    { date: 'May 5', measurements: 16, alterations: 5, revenue: 320 },
    { date: 'May 4', measurements: 14, alterations: 7, revenue: 350 },
    { date: 'May 3', measurements: 18, alterations: 9, revenue: 450 },
    { date: 'May 2', measurements: 15, alterations: 6, revenue: 300 },
    { date: 'May 1', measurements: 12, alterations: 8, revenue: 400 },
  ].slice(-10);

  const customersData = [
    { date: 'May 10', new: 4, vip: 2, revenue: 680 },
    { date: 'May 9', new: 3, vip: 3, revenue: 720 },
    { date: 'May 8', new: 5, vip: 1, revenue: 540 },
    { date: 'May 7', new: 2, vip: 2, revenue: 580 },
    { date: 'May 6', new: 6, vip: 0, revenue: 480 },
    { date: 'May 5', new: 3, vip: 1, revenue: 520 },
    { date: 'May 4', new: 4, vip: 2, revenue: 660 },
    { date: 'May 3', new: 5, vip: 1, revenue: 560 },
    { date: 'May 2', new: 3, vip: 3, revenue: 740 },
    { date: 'May 1', new: 2, vip: 2, revenue: 600 },
  ].slice(-10);

  // Summary stats
  const summaryStats = [
    { 
      title: "Total Measurements", 
      value: tailoringData.reduce((sum, item) => sum + item.measurements, 0),
      icon: <FiScissors className="text-2xl" />,
      trend: "12% ↑"
    },
    { 
      title: "VIP Clients", 
      value: customersData.reduce((sum, item) => sum + item.vip, 0),
      icon: <FiUsers className="text-2xl" />,
      trend: "5% ↑"
    },
    { 
      title: "Revenue (K)", 
      value: (tailoringData.reduce((sum, item) => sum + item.revenue, 0) / 1000).toFixed(1),
      icon: <FiDollarSign className="text-2xl" />,
      trend: "18% ↑"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const renderMainChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={activeTab === 'tailoring' ? tailoringData : customersData}>
          <defs>
            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0D6C9" />
          <XAxis 
            dataKey="date" 
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
          <Bar
            dataKey={activeTab === 'tailoring' ? "measurements" : "new"}
            fill="url(#colorPrimary)"
            radius={[4, 4, 0, 0]}
            animationDuration={1800}
          />
          <Bar
            dataKey={activeTab === 'tailoring' ? "alterations" : "vip"}
            fill="url(#colorAccent)"
            radius={[4, 4, 0, 0]}
            animationDuration={1800}
          />
        </BarChart>
      </ResponsiveContainer>
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
            Atelier Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: COLORS.text }}>
            Premium Tailoring Analytics • Last 10 Records
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
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border-l-4"
              style={{ 
                borderLeftColor: COLORS.primary,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider" style={{ color: COLORS.text }}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-light mt-2" style={{ color: COLORS.primary }}>
                    {stat.value}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium" style={{ color: COLORS.accent }}>
                    {stat.trend}
                  </span>
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${COLORS.primary}10` }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
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
                Loading luxury insights...
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
                {['tailoring', 'customers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab
                        ? 'text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    style={{
                      backgroundColor: activeTab === tab ? COLORS.primary : 'transparent'
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
                      {activeTab === 'tailoring' ? 'Measurements & Alterations' : 'Client Acquisition'}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-xs" style={{ color: COLORS.text }}>
                        Last 10 Days
                      </span>
                    </div>
                  </div>
                  <motion.div
                    layout
                    className="h-80"
                  >
                    {renderMainChart()}
                  </motion.div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-medium mb-4 flex items-center" style={{ color: COLORS.primary }}>
                      <FiTrendingUp className="mr-2" /> Recent {activeTab === 'tailoring' ? 'Orders' : 'Clients'}
                    </h3>
                    <div className="space-y-4">
                      {(activeTab === 'tailoring' ? tailoringData : customersData)
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div>
                              <p className="font-medium" style={{ color: COLORS.text }}>
                                {item.date}
                              </p>
                              <p className="text-xs text-gray-500">
                                {activeTab === 'tailoring' 
                                  ? `${item.measurements} Measurements • ${item.alterations} Alterations`
                                  : `${item.new} New • ${item.vip} VIP`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium" style={{ color: COLORS.primary }}>
                                ${activeTab === 'tailoring' ? item.revenue : item.revenue * 10}
                              </p>
                              <p className="text-xs" style={{ color: COLORS.accent }}>
                                Completed
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-medium mb-4 flex items-center" style={{ color: COLORS.primary }}>
                      <FiDollarSign className="mr-2" /> Revenue Breakdown
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={activeTab === 'tailoring' 
                              ? [
                                  { name: 'Measurements', value: tailoringData.reduce((sum, item) => sum + item.measurements * 20, 0) },
                                  { name: 'Alterations', value: tailoringData.reduce((sum, item) => sum + item.alterations * 15, 0) }
                                ]
                              : [
                                  { name: 'New Clients', value: customersData.reduce((sum, item) => sum + item.new * 100, 0) },
                                  { name: 'VIP Clients', value: customersData.reduce((sum, item) => sum + item.vip * 250, 0) }
                                ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            animationDuration={1500}
                          >
                            <Cell fill={COLORS.primary} />
                            <Cell fill={COLORS.accent} />
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`$${value}`, 'Revenue']}
                            contentStyle={{
                              background: 'rgba(255, 255, 255, 0.96)',
                              border: `1px solid ${COLORS.primary}`,
                              borderRadius: '8px',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
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