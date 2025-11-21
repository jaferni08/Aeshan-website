
import React, { useState, useRef } from 'react';
import { ArrowRight, Plus, ArrowLeft } from 'lucide-react';
import { ProjectData } from './ProjectDetailsPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

interface ProjectsProps {
  projects: ProjectData[];
  onProjectClick: (project: ProjectData) => void;
}

export default function Projects({ projects, onProjectClick }: ProjectsProps) {
  // Filter to get "Other Projects"
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.title !== featuredProject?.title);

  // State & Refs
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Determine if we have enough projects to slide
  const hasProjects = otherProjects.length > 0;

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  if (!featuredProject) return null;

  return (
    <section id="projects" className="pt-12 md:pt-32 pb-8 md:pb-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-10 md:mb-16">
          <h4 className="text-accent font-bold tracking-wider mb-2 text-sm md:text-base">أحدث المشاريع</h4>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">تميزنا في التفاصيل</h2>
        </div>

        {/* Featured Project Card */}
        <div className="md:mb-12">
          <div
            className="bg-secondary rounded-sm overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500"
            onClick={() => onProjectClick(featuredProject)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="h-64 md:h-[500px] overflow-hidden relative">
                <img src={featuredProject.img} alt={featuredProject.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">المشروع المميز</div>
              </div>
              <div className="p-6 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-12 right-0 w-1 h-20 bg-accent hidden md:block"></div>

                <h3 className="text-2xl md:text-4xl font-bold text-primary mb-3 md:mb-4 group-hover:text-accent transition-colors">{featuredProject.title}</h3>
                <p className="text-accent font-semibold text-xs md:text-sm mb-3 md:mb-4">{featuredProject.category}</p>
                <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-base line-clamp-3">
                  {featuredProject.desc}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 border-t border-gray-200 pt-4 md:pt-6">
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1">الموقع</p>
                    <p className="font-semibold text-sm md:text-base text-primary">{featuredProject.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-1">السنة</p>
                    <p className="font-semibold text-sm md:text-base text-primary">{featuredProject.year}</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-accent font-bold text-sm group-hover:translate-x-2 transition-transform duration-300 self-start">
                  <span>عرض التفاصيل</span>
                  <ArrowRight size={18} className="rotate-180" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Slider */}
        {hasProjects && (
          <div className="relative mt-8">
            <div className="flex justify-between items-end mb-8" dir="rtl">
              <h3 className="text-xl md:text-2xl font-bold text-primary">المشاريع الأخرى</h3>

              {/* Desktop Navigation Controls */}
              <div className="hidden md:flex gap-3">
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-sm border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer z-10"
                  aria-label="Next"
                >
                  <ArrowRight size={18} className="rotate-180" />
                </button>
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-sm border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer z-10"
                  aria-label="Previous"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Swiper Container */}
            <div className="relative">
              <Swiper
                dir="rtl"
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                // pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setCurrentIndex(swiper.realIndex);
                }}
                className="w-full max-h-[350px]"
              >
                {otherProjects.map((project, index) => (
                  <SwiperSlide key={`${project.title}-${index}`} className="max-h-[350px]">
                    <div className="px-0.5 pb-2"> {/* Padding for shadow */}
                      <div
                        className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 max-h-[350px] group relative cursor-pointer"
                        onClick={() => onProjectClick(project)}
                        dir="rtl"
                      >
                        <img
                          src={project.img}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={project.title}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-right">
                          <h3 className="text-xl text-white font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-cairo">{project.title}</h3>
                          <p className="text-accent text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 font-cairo">{project.category}</p>
                          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            <Plus className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Mobile Navigation Arrows (Centered Vertically on sides) */}
              <div className="md:hidden absolute top-[calc(50%-20px)] left-0 right-0 z-20 flex justify-between w-full pointer-events-none">


                {/* Next Button (Visually on Left for RTL flow next) */}

                {/* Prev Button (Visually on Right for RTL flow prev) */}
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

          </div>
        )}
      </div>
    </section>
  );
}
