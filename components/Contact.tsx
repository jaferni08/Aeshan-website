import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact-section" className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <h4 className="text-accent font-bold tracking-wider mb-2 text-sm md:text-base">تواصل معنا</h4>
           <h2 className="text-3xl md:text-5xl font-bold text-primary">نحن هنا لمساعدتك</h2>
           <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
             نحن هنا للإجابة على استفساراتكم ومناقشة مشاريعكم. تفضلوا بزيارتنا في مقرنا أو تواصلوا معنا عبر القنوات التالية.
           </p>
        </motion.div>

        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-6 p-8 bg-secondary/20 rounded-sm border border-gray-100 hover:border-accent/30 hover:bg-secondary/40 transition-all group"
                >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-accent shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <MapPin size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-2">الموقع</h3>
                        <p className="text-gray-600">الرياض، طريق الملك فهد، برج العليا</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-6 p-8 bg-secondary/20 rounded-sm border border-gray-100 hover:border-accent/30 hover:bg-secondary/40 transition-all group"
                >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-accent shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Phone size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-2">الهاتف</h3>
                        <p className="text-gray-600" dir="ltr">+966 11 234 5678</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-6 p-8 bg-secondary/20 rounded-sm border border-gray-100 hover:border-accent/30 hover:bg-secondary/40 transition-all group"
                >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-accent shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Mail size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-2">البريد الإلكتروني</h3>
                        <p className="text-gray-600">info@eishan.com</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-6 p-8 bg-secondary/20 rounded-sm border border-gray-100 hover:border-accent/30 hover:bg-secondary/40 transition-all group"
                >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-accent shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Clock size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-2">ساعات العمل</h3>
                        <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;