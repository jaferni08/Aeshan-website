import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowLeftCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <header id="hero" className="relative h-[100dvh] w-full overflow-hidden bg-dark">
      {/* Slider Wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[currentSlide]}')` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-6 z-20 text-white">
        <div className="max-w-3xl space-y-4 md:space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-xl text-accent font-medium tracking-widest uppercase"
          >
            رؤية معمارية متجددة
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight"
          >
            نصمم المستقبل <br /> بلمسة إبداعية
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-200 max-w-xl leading-relaxed"
          >
            في ايشان، نحن نجمع بين الجمال والوظيفة لنخلق مساحات تلهم الحياة. تصميمات عصرية تناسب تطلعاتك.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4"
          >
            <a href="#projects" className="inline-flex rounded-sm items-center gap-2 border border-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-base hover:bg-white hover:text-primary transition-all duration-300 group">
              <span>استكشف أعمالنا</span>
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-20 z-30 flex gap-3 md:gap-4">
        <button onClick={prevSlide} className="w-10 h-10 rounded-sm md:w-12 md:h-12 border border-white/30 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button onClick={nextSlide} className="w-10 h-10 md:w-12 rounded-sm md:h-12 border border-white/30 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </header>
  );
};

export default Hero;