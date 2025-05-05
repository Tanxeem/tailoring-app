import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8"
        >
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Luxe<span className="text-white">Tailor</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-amber-500 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              <FiInstagram className="text-lg" />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-amber-500 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              <FiFacebook className="text-lg" />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-amber-500 hover:text-white transition-colors"
              whileHover={{ y: -3 }}
            >
              <FiTwitter className="text-lg" />
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} LuxeTailor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;