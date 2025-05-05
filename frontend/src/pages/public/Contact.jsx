import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
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
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book an appointment or ask about our tailoring services
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                    <FiMapPin className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Our Address</h4>
                    <p className="text-gray-600">Municipality Turbah Hail<br />Saudia Arabia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                    <FiPhone className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                    <p className="text-gray-600">+966 (590) 111-111</p>
                    <p className="text-sm text-gray-500 mt-1">Saturday-Thursday, 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                    <FiMail className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">hello@tailorapp.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 text-amber-500">
                    <FiClock className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">Working Hours</h4>
                    <p className="text-gray-600">Saturday - Wednesday: 9am - 9pm</p>
                    <p className="text-gray-600">Thursday: 9am - 10pm</p>
                    <p className="text-gray-600">Friday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  {['Instagram', 'Facebook', 'Pinterest'].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-amber-500 hover:text-white transition-colors"
                      whileHover={{ y: -3 }}
                    >
                      {social.charAt(0)}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Tell us about your tailoring needs..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Embed */}
        <motion.div 
          className="mt-12 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7028.458145124238!2d42.915373399400735!3d28.26107005982784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zLA!5e0!3m2!1sen!2ssa!4v1746462477658!5m2!1sen!2ssa" 
            width="100%" 
            height="400" 
            style={{ border: 0 }}
            allowFullScreen 
            loading="lazy"
            title="Our Location"
            className="filter grayscale-20 hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


