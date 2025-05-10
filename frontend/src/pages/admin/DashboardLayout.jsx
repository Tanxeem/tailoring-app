import { useState } from 'react';
import { FiSearch, FiLogOut, FiUserPlus, FiUsers, FiScissors, FiMenu, FiX } from 'react-icons/fi';
import { useNavigate, Outlet, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdDashboard } from "react-icons/md";
import { backendUrl } from '../../App';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { role } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/user/logout`, {}, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,  
      });

      if (response.status === 200) {
        toast.success(response.data.message);  
        navigate('/login');  
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none md:hidden"
            >
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div onClick={() => navigate('/admin/dashboard')} className="cursor-pointer">
              <h1 className="text-xl font-bold text-gray-800">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Luxe</span>Tailor
              </h1>
            </div>
          </div>

          <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-sm font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-800">
              {role === 'admin' ? 'Administrator' : 'Tailor'}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-md shadow-sm hover:from-amber-600 hover:to-orange-600"
            >
              <FiLogOut className="mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`w-64 bg-white shadow transform transition-transform duration-300 ease-in-out 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            fixed inset-y-0 left-0 z-40 md:relative md:translate-x-0`}>
          <nav className="p-4 h-full">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    navigate('/admin/dashboard');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  <MdDashboard className="mr-3 text-lg" />
                  <span>Dashboard</span>
                </button>
              </li>
              
              {role === 'admin' && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/admin/create-user');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      <FiUserPlus className="mr-3 text-lg" />
                      <span>Create User</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate('/admin/users');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                    >
                      <FiUsers className="mr-3 text-lg" />
                      <span>All Users</span>
                    </button>
                  </li>
                </>
              )}
              
              <li>
                <button
                  onClick={() => {
                    navigate('/admin/create-measurement');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  <FiScissors className="mr-3 text-lg" />
                  <span>Create Measurement</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/admin/client-details');
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  <FiScissors className="mr-3 text-lg" />
                  <span>Client Details</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Right Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;