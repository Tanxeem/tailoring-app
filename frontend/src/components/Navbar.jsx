import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', hash: '#' },
    { name: 'Services', path: '/services', hash: '#services' },
    { name: 'About', path: '/about', hash: '#about' },
    { name: 'Contact', path: '/contact', hash: '#contact' }
  ];

  const handleNavigation = (path, hash) => {
    if (location.pathname === '/') {
      // On home page, use hash navigation
      window.location.hash = hash;
    } else {
      // On other pages, use regular navigation
      navigate(path);
    }
    setMobileOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setMobileOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/95 shadow-lg' : 'py-5 bg-white/90'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer"
          onClick={() => handleNavigation('/', '#')}
        >
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Luxe<span className="text-indigo-700">Design</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {navItems.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
              onClick={() => handleNavigation(item.path, item.hash)}
            >
              <div className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                {item.name}
              </div>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 5px 15px rgba(79, 70, 229, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={handleLogin}
        >
          Login
        </motion.button>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className={`w-8 flex flex-col gap-1.5 transition-all ${mobileOpen ? 'rotate-180' : ''}`}>
            <span className={`h-0.5 bg-gray-800 rounded-full transition-all ${mobileOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></span>
            <span className={`h-0.5 bg-gray-800 rounded-full transition-all ${mobileOpen ? 'opacity-0' : 'w-8'}`}></span>
            <span className={`h-0.5 bg-gray-800 rounded-full transition-all ${mobileOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-8'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`lg:hidden overflow-hidden ${mobileOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0 }}
        animate={{ height: mobileOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white py-4 px-6 space-y-3">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              className="block py-3 px-4 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors font-medium cursor-pointer"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleNavigation(item.path, item.hash)}
            >
              {item.name}
            </motion.div>
          ))}
          <motion.button
            className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;