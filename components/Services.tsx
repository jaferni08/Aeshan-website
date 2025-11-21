
import React, { useState } from 'react';
import { Home, Building2, Ruler, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    icon: <Home className="w-6 h-6 md:w-7 md:h-7" />,
    title: "التصميم الداخلي",
    desc: "نبتكر مساحات داخلية تعكس شخصيتك وتلبي احتياجاتك الوظيفية بأناقة ورفاهية."
  },
  {
    icon: <Building2 className="w-6 h-6 md:w-7 md:h-7" />,
    title: "الهندسة المعمارية",
    desc: "تصميم مباني أيقونية تراعي البيئة المحيطة وتستخدم أحدث تقنيات البناء."
  },
  {
    icon: <Ruler className="w-6 h-6 md:w-7 md:h-7" />,
    title: "تخطيط المساحات",
    desc: "حلول ذكية لاستغلال كل زاوية في مساحتك لضمان الراحة والانسيابية في الحركة."
  }
];

const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleService = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-primary text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-16 space-y-2 md:space-y-4"
        >
          <h4 className="text-accent font-bold tracking-wider text-sm md:text-base">خدماتنا</h4>
          <h2 className="text-2xl md:text-4xl font-bold text-white">ماذا نقدم لعملائنا</h2>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 group rounded-sm border border-white/10 hover:border-accent"
            >
              <div className="w-14 h-14 bg-accent text-white flex items-center justify-center mb-6 transition-colors rounded-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden flex flex-col gap-4">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white/5 border border-white/10 rounded-sm overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/10' : ''}`}
              >
                <button 
                  onClick={() => toggleService(index)}
                  className="w-full flex items-center justify-between p-5 text-right"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors ${isOpen ? 'bg-accent text-white' : 'bg-white/10 text-white'}`}>
                      {service.icon}
                    </div>
                    <h3 className={`font-bold text-lg ${isOpen ? 'text-accent' : 'text-white'}`}>{service.title}</h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 pt-0">
                        <p className="text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                          {service.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
