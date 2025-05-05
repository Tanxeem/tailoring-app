import { motion } from 'framer-motion';
import { FiScissors, FiUsers, FiAward, FiHeart } from 'react-icons/fi';

const About = () => {
  const stats = [
    { value: "15+", label: "Years Experience", icon: <FiScissors /> },
    { value: "5,000+", label: "Satisfied Clients", icon: <FiUsers /> },
    { value: "50+", label: "Awards Won", icon: <FiAward /> },
    { value: "100%", label: "Quality Guarantee", icon: <FiHeart /> }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Tailoring Legacy</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Crafting perfection in every stitch since 2008
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Section */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/tailor-about.jpg" 
                alt="Master tailor at work"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden lg:block">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-2xl">
                <FiScissors />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Precision Tailoring With a Personal Touch
            </h3>
            
            <p className="text-gray-600 mb-6">
              Founded in 2008 by master tailor Antonio Ricci, our atelier combines traditional craftsmanship with modern techniques to deliver garments of exceptional quality.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">Bespoke Service:</span> Each garment is individually crafted to your measurements
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">Premium Fabrics:</span> Sourced from the finest mills in Italy and England
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">Sustainable Practices:</span> Eco-friendly materials and zero-waste patterns
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg text-center"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="text-amber-500 text-2xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;