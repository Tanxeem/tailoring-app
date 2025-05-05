import { useState } from 'react';
import { FiSearch, FiLogOut, FiUserPlus, FiUsers, FiScissors } from 'react-icons/fi';
import { useNavigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    // Add logout logic
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div onClick={() => navigate('/admin/dashboard')} className="cursor-pointer">
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Luxe</span>Tailor
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-4">
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-md shadow-sm hover:from-amber-600 hover:to-orange-600"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white shadow hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/admin/create-user')}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                >
                  <FiUserPlus className="mr-3 text-lg" />
                  <span>Create User</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin/users')}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                >
                  <FiUsers className="mr-3 text-lg" />
                  <span>All Users</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin/create-measurement')}
                  className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                >
                  <FiScissors className="mr-3 text-lg" />
                  <span>Create Measurement</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;