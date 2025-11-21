
import React, { useState } from 'react';
import { Quote, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewData } from './Dashboard';

interface TestimonialsProps {
  reviews: ReviewData[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    if (reviews.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-12 md:py-20 bg-white text-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3"
          >
            <h4 className="text-accent font-bold tracking-wider mb-2 text-sm md:text-base">آراء العملاء</h4>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-primary">ثقتكم سر نجاحنا</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              نفتخر بالشراكات التي بنيناها على مر السنين. إليكم ما يقوله عملاؤنا عن تجربتهم في العمل معنا.
            </p>
            <div className="mt-6 md:mt-8 flex gap-4">
              <button onClick={prevReview} className="p-2 md:p-3 rounded-sm border border-primary/20 text-primary hover:bg-accent hover:text-white hover:border-accent transition-colors">
                <ArrowRight size={20} />
              </button>
              <button onClick={nextReview} className="p-2 md:p-3 rounded-sm border border-primary/20 text-primary hover:bg-accent hover:text-white hover:border-accent transition-colors">
                <ArrowLeft size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-2/3"
          >
            <div className="bg-primary text-white p-6 md:p-12 rounded-sm shadow-2xl relative min-h-[250px] md:min-h-[300px] flex flex-col justify-center">
              <Quote className="text-accent/20 absolute top-4 right-4 md:right-8 w-10 h-10 md:w-16 md:h-16" />
              
              <AnimatePresence mode='wait'>
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-1 text-accent text-sm mb-3 md:mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-lg md:text-2xl font-light italic leading-relaxed mb-6 md:mb-8">
                    "{reviews[currentIndex].text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={reviews[currentIndex].img} alt={reviews[currentIndex].name} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-accent" />
                    <div>
                      <h5 className="font-bold text-white text-sm md:text-base">{reviews[currentIndex].name}</h5>
                      <span className="text-xs md:text-sm text-gray-400">{reviews[currentIndex].role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
