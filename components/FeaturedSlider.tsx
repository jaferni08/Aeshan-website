
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ProjectData } from './ProjectDetailsPage';

interface FeaturedSliderProps {
  projects: ProjectData[];
  onProjectClick: (project: ProjectData) => void;
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ projects, onProjectClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    })
  };

  return (
    <section className="py-20 bg-dark overflow-hidden relative">
      <div className="container mx-auto px-6 mb-10 flex flex-col md:flex-row items-center md:items-end justify-between relative z-10 gap-6 md:gap-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-right"
        >
          <h2 className="text-accent font-bold tracking-wider text-sm md:text-base mb-2">أعمال مختارة</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">إبداع ايشان</h3>
        </motion.div>

        {/* Navigation Buttons - Desktop Only */}
        <div className="hidden md:flex gap-3 justify-center w-full md:w-auto">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-sm border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous"
          >
            <ArrowRight size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-sm border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300 backdrop-blur-sm"
            aria-label="Next"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>

      {/* Slider Area */}
      <div className="relative h-[500px] md:h-[600px] w-full max-w-[1600px] mx-auto touch-pan-y">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="absolute inset-0 px-4 md:px-6 cursor-grab active:cursor-grabbing touch-pan-y"
          >
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group select-none"
              onClick={() => onProjectClick(projects[currentIndex])}
            >
              {/* Image */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={projects[currentIndex].img}
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                      {projects[currentIndex].year}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md text-xs font-bold text-accent border border-accent/20">
                      {projects[currentIndex].category}
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-6xl font-bold text-white mb-4 leading-tight"
                  >
                    {projects[currentIndex].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-sm md:text-lg leading-relaxed line-clamp-2"
                  >
                    {projects[currentIndex].desc}
                  </motion.p>
                </div>

                {/* Action Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="hidden md:flex w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white group-hover:bg-accent group-hover:border-accent transition-all duration-300"
                >
                  <ArrowUpRight size={28} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Navigation Arrows (Centered Vertically on sides - Matching Projects.tsx Style) */}
        <div className="md:hidden absolute top-[calc(50%-20px)] left-0 right-0 z-20 flex justify-between w-full pointer-events-none">
          <button
            onClick={handlePrev}
            className="pointer-events-auto w-10 h-10 bg-white/90 backdrop-blur-sm text-primary shadow-lg flex items-center justify-center rounded-l-full hover:bg-accent hover:text-white transition-all -mr-1 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ArrowRight size={20} />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto w-10 h-10 bg-white/90 backdrop-blur-sm text-primary shadow-lg flex items-center justify-center rounded-r-full hover:bg-accent hover:text-white transition-all -ml-1 cursor-pointer"
            aria-label="Next Slide"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mt-8 md:mt-10">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSlider;
