import { motion } from 'framer-motion';
import { FiScissors, FiShoppingBag, FiUser, FiClock, FiTruck, FiAward } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiScissors className="text-3xl" />,
      title: "Custom Tailoring",
      description: "Bespoke garments crafted to your exact measurements and style preferences.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <FiShoppingBag className="text-3xl" />,
      title: "Ready-to-Wear Alterations",
      description: "Perfect fit adjustments for your existing wardrobe items.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <FiUser className="text-3xl" />,
      title: "Personal Styling",
      description: "Expert advice on fabrics, cuts, and styles that flatter your body type.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <FiClock className="text-3xl" />,
      title: "Express Services",
      description: "Quick turnaround for urgent alterations and last-minute needs.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: <FiTruck className="text-3xl" />,
      title: "Home Consultations",
      description: "Personalized service at your convenience with our mobile tailoring.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Bridal & Special Occasion",
      description: "Exquisite tailoring for weddings, galas, and important events.",
      color: "from-fuchsia-500 to-purple-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Tailoring Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium tailoring solutions designed to make you look and feel your absolute best
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-6">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
                  Learn more →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for Perfect Fit?</h3>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Book an appointment with our master tailors and experience clothing that truly fits
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-full shadow-lg"
          >
            Schedule Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;