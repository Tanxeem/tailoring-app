import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* Background Image with Overlay - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/hero.jpeg" 
          alt="Tailor at work"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>
      
      {/* Content Container - Responsive */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          {/* Badge - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1 text-sm sm:text-base font-semibold text-white bg-white/20 rounded-full backdrop-blur-sm"
          >
            Premium Tailoring Services
          </motion.div>
          
          {/* Main Heading - Responsive Font Sizes */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Perfect Fit <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Guaranteed</span>
          </motion.h1>
          
          {/* Subheading - Responsive */}
          <motion.p
            className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Bespoke tailoring and alterations crafted to perfection by our master tailors
          </motion.p>
          
          {/* Buttons - Stack on Mobile */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              onClick={() => navigate('/contact')}
            >
              Book Appointment
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-3.5 bg-transparent border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all text-sm sm:text-base"
              onClick={() => navigate('/services')}
            >
              Our Services
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Indicator - Responsive Positioning */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-7 h-10 sm:w-8 sm:h-12 border-2 border-white/50 rounded-full flex justify-center p-1">
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, 10] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <p className="text-white text-xs sm:text-sm mt-2 text-center hidden sm:block">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;