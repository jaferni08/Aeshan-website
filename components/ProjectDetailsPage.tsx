
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Ruler, User, Share2, ArrowUpRight, X, ChevronRight, ChevronLeft, BookOpen, LayoutTemplate, Layers, AlignLeft, ArrowLeft, Info } from 'lucide-react';

export interface ProjectData {
  title: string;
  category: string;
  desc: string;
  fullDesc: string;
  img: string;
  year: string;
  location: string;
  client: string;
  area: string;
  featured: boolean;
}

interface ProjectDetailsPageProps {
  project: ProjectData;
  allProjects: ProjectData[];
  onBack: () => void;
  onProjectClick: (project: ProjectData) => void;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project, allProjects, onBack, onProjectClick }) => {
  
  // View Mode State (Visual by default)
  const [viewMode, setViewMode] = useState<'visual' | 'reading'>('visual');

  // Lightbox State
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);

  // Scroll to top on mount & Check Tutorial
  useEffect(() => {
    window.scrollTo(0, 0);

    // Check local storage for tutorial flag
    const hasSeenTutorial = localStorage.getItem('hasSeenViewModeTutorial');
    if (!hasSeenTutorial) {
      // Delay showing it slightly for better UX
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [project]);

  const handleDismissTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenViewModeTutorial', 'true');
  };

  // Mock gallery images + the main project image
  const galleryImages = [
    project.img,
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
  ];

  // Lightbox Handlers
  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Determine Next Project
  const currentIndex = allProjects.findIndex(p => p.title === project.title);
  const nextIndex = (currentIndex + 1) % allProjects.length;
  const nextProject = allProjects[nextIndex];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white min-h-screen text-primary font-cairo"
      >
        {/* --- Navigation Header --- */}
        <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            {/* Back Button & Logo/Modes Area */}
            <div className="flex items-center gap-4 md:gap-6">
                <button 
                  onClick={onBack}
                  className="group flex items-center gap-3 text-gray-600 hover:text-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </div>
                </button>
                
                {/* Logo (Desktop Only) */}
                <div className="hidden md:flex items-center gap-2 border-r border-gray-200 pr-6 mr-2">
                   <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-sm text-sm font-bold">ا</div>
                   <span className="text-xl font-bold tracking-tighter text-primary">ايشان</span>
                </div>

                {/* Modes Toggle (Mobile Only - Replaces Logo) */}
                <div className="flex md:hidden bg-gray-100 p-1 rounded-md border border-gray-200 relative">
                    <button 
                        onClick={() => setViewMode('visual')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all ${viewMode === 'visual' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
                        title="الوضع البصري"
                    >
                        <LayoutTemplate size={16} />
                        <span className="text-xs font-bold">بصري</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('reading')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm transition-all ${viewMode === 'reading' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
                        title="وضع القراءة"
                    >
                        <AlignLeft size={16} />
                        <span className="text-xs font-bold">قراءة</span>
                    </button>

                    {/* Mobile Tooltip */}
                    <AnimatePresence>
                      {showTutorial && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 mt-3 w-56 bg-primary text-white p-3 rounded-lg shadow-xl z-50 text-right"
                        >
                            <div className="absolute -top-1 right-8 w-3 h-3 bg-primary rotate-45"></div>
                            <div className="flex justify-between items-start relative z-10 gap-2">
                                <div>
                                    <h4 className="font-bold text-xs mb-1 text-accent">تلميح</h4>
                                    <p className="text-[10px] text-gray-300 leading-relaxed">يمكنك التبديل بين عرض الصور والنصوص من هنا.</p>
                                </div>
                                <button onClick={handleDismissTutorial} className="text-gray-400 hover:text-white"><X size={14} /></button>
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Desktop View Toggle (Visible only on MD+) */}
            <div className="hidden md:flex bg-gray-100 p-1 rounded-lg border border-gray-200 absolute left-1/2 -translate-x-1/2 relative">
                <button 
                    onClick={() => setViewMode('visual')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'visual' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary'}`}
                >
                    <LayoutTemplate size={16} />
                    <span>بصري</span>
                </button>
                <button 
                    onClick={() => setViewMode('reading')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'reading' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-primary'}`}
                >
                    <BookOpen size={16} />
                    <span>قراءة</span>
                </button>

                {/* Desktop Tutorial Tooltip */}
                <AnimatePresence>
                  {showTutorial && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-primary text-white p-4 rounded-lg shadow-xl z-50"
                    >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex gap-3">
                                <Info className="text-accent shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h4 className="font-bold text-sm mb-1">تجربة تصفح جديدة</h4>
                                    <p className="text-xs text-gray-300 leading-relaxed">يمكنك التبديل بين الوضع البصري للصور ووضع القراءة للتفاصيل.</p>
                                </div>
                            </div>
                            <button onClick={handleDismissTutorial} className="text-gray-400 hover:text-white"><X size={14} /></button>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-accent hover:text-accent transition-all" title="مشاركة">
                    <Share2 size={18} />
                </button>
                <button 
                  onClick={() => onProjectClick(nextProject)}
                  className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-accent transition-all"
                >
                    <span>المشروع التالي</span>
                    <ArrowLeft size={16} />
                </button>
            </div>
          </div>
        </nav>

        {/* --- Main Content --- */}
        <main className="pt-20">
           <AnimatePresence mode="wait">
              {viewMode === 'visual' ? (
                 <VisualView key="visual" project={project} galleryImages={galleryImages} openLightbox={openLightbox} />
              ) : (
                 <ReadingView key="reading" project={project} galleryImages={galleryImages} />
              )}
           </AnimatePresence>
        </main>

        {/* --- Lightbox Overlay --- */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2">
                <X size={32} />
              </button>

              <button onClick={nextImage} className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors p-4 bg-white/5 hover:bg-white/10 rounded-full">
                <ArrowLeft size={32} />
              </button>

              <button onClick={prevImage} className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors p-4 bg-white/5 hover:bg-white/10 rounded-full">
                <ArrowRight size={32} />
              </button>

              <img 
                src={galleryImages[selectedImageIndex]} 
                alt="Gallery Preview" 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-6 left-0 w-full text-center text-white/50 text-sm font-mono">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </>
  );
};

// --- Sub Components ---

const VisualView = ({ project, galleryImages, openLightbox }: { project: ProjectData, galleryImages: string[], openLightbox: (idx: number) => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="pb-20"
    >
        {/* Hero Image */}
        <div className="h-[50vh] md:h-[85vh] w-full relative overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
             <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5 }}
               className="w-full h-full"
             >
                <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             
             <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 text-white">
                 <div className="container mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold mb-4 rounded-sm">{project.category}</span>
                        <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">{project.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-300 font-mono">
                            <span className="flex items-center gap-2"><MapPin size={16} className="text-accent"/> {project.location}</span>
                            <span className="flex items-center gap-2"><Calendar size={16} className="text-accent"/> {project.year}</span>
                            <span className="flex items-center gap-2"><Ruler size={16} className="text-accent"/> {project.area}</span>
                        </div>
                    </motion.div>
                 </div>
             </div>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-6 mt-12 md:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-4 md:space-y-8">
                    <div className="mb-12 md:mb-20 pr-4 md:pr-10">
                        <h3 className="text-2xl font-bold mb-4">الفكرة التصميمية</h3>
                        <p className="text-gray-600 leading-loose text-lg">{project.fullDesc}</p>
                    </div>
                    <div className="overflow-hidden rounded-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openLightbox(1)}>
                         <img src={galleryImages[1]} className="w-full h-[300px] md:h-[600px] object-cover" alt="Detail 1" />
                    </div>
                </div>
                <div className="space-y-4 md:space-y-8 pt-0 md:pt-20">
                    <div className="overflow-hidden rounded-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openLightbox(2)}>
                         <img src={galleryImages[2]} className="w-full h-[250px] md:h-[400px] object-cover" alt="Detail 2" />
                    </div>
                    <div className="overflow-hidden rounded-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openLightbox(3)}>
                         <img src={galleryImages[3]} className="w-full h-[300px] md:h-[500px] object-cover" alt="Detail 3" />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const ReadingView = ({ project, galleryImages }: { project: ProjectData, galleryImages: string[] }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-secondary/30"
    >
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-5xl">
            <div className="bg-white p-8 md:p-16 rounded-sm shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-12 mb-12 border-b border-gray-100 pb-12">
                    <div className="flex-1">
                        <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">{project.category}</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">{project.title}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed font-light">{project.desc}</p>
                    </div>
                    <div className="w-full md:w-1/3 space-y-6 text-sm border-r-0 md:border-r border-gray-100 pr-0 md:pr-8">
                        <div>
                            <span className="block text-gray-400 text-xs mb-1 uppercase tracking-wider">العميل</span>
                            <span className="font-bold text-primary block flex items-center gap-2"><User size={16} className="text-accent"/> {project.client}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-xs mb-1 uppercase tracking-wider">الموقع</span>
                            <span className="font-bold text-primary block flex items-center gap-2"><MapPin size={16} className="text-accent"/> {project.location}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-xs mb-1 uppercase tracking-wider">السنة</span>
                            <span className="font-bold text-primary block flex items-center gap-2"><Calendar size={16} className="text-accent"/> {project.year}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-xs mb-1 uppercase tracking-wider">المساحة</span>
                            <span className="font-bold text-primary block flex items-center gap-2"><Ruler size={16} className="text-accent"/> {project.area}</span>
                        </div>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-loose">
                     <h3 className="text-2xl font-bold text-primary mb-4">نظرة عامة</h3>
                     <p className="mb-8">{project.fullDesc}</p>
                     
                     <div className="my-12">
                        <img src={project.img} alt={project.title} className="w-full h-[300px] md:h-[500px] object-cover rounded-sm shadow-lg" />
                        <p className="text-center text-sm text-gray-500 mt-2">واجهة المشروع الرئيسية</p>
                     </div>

                     <h3 className="text-2xl font-bold text-primary mb-4">التحديات والحلول</h3>
                     <p>
                        واجه فريق التصميم تحديات متعددة في هذا المشروع، أبرزها كيفية دمج البناء الحديث مع البيئة الطبيعية المحيطة دون الإخلال بالتوازن البيئي. تم استخدام مواد محلية الصنع وتقنيات عزل متطورة لتقليل استهلاك الطاقة.
                        النتيجة كانت تحفة معمارية لا توفر مسكناً فاخراً فحسب، بل تقدم نموذجاً للاستدامة.
                     </p>
                     
                     <blockquote className="border-r-4 border-accent pr-6 py-2 my-8 text-xl italic bg-gray-50 p-6 rounded-r-sm">
                        "التصميم ليس مجرد ما نراه ونلمسه، التصميم هو كيف يعمل الشيء وكيف نشعر به."
                     </blockquote>
                </div>
            </div>
        </div>
    </motion.div>
);

export default ProjectDetailsPage;
