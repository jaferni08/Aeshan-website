
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Users, Building } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-32 bg-primary text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-900/5 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Text Content Section (Right Side in RTL) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6 md:space-y-8"
          >
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 md:w-10 h-[2px] bg-accent"></div>
                  <span className="text-accent font-bold tracking-widest text-xs md:text-sm uppercase">من نحن</span>
               </div>
               <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">
                  نصوغ المستقبل <br/> 
                  <span className="text-gray-400">بتصاميم تتجاوز الزمن</span>
               </h2>
               <p className="text-gray-400 leading-loose text-sm md:text-lg">
                  في ايشان، لا نكتفي ببناء الجدران؛ نحن نخلق تجارب حياة. منذ تأسيسنا، كرسنا جهودنا لدمج الفن المعماري الأصيل مع أحدث تقنيات البناء المستدام، لنقدم لعملائنا مساحات تعكس هويتهم وتلبي طموحاتهم.
               </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-white/5 flex items-center justify-center text-accent shrink-0">
                     <Award size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold text-base md:text-lg mb-1">جودة عالمية</h4>
                     <p className="text-xs md:text-sm text-gray-500">نلتزم بأعلى معايير الجودة في التصميم والتنفيذ.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-sm bg-white/5 flex items-center justify-center text-accent shrink-0">
                     <Users size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold text-base md:text-lg mb-1">فريق محترف</h4>
                     <p className="text-xs md:text-sm text-gray-500">نخبة من المهندسين والمصممين ذوي الخبرة الطويلة.</p>
                  </div>
               </div>
            </div>

            {/* Stats Row */}
            <div className="pt-6 md:pt-8 border-t border-white/10 flex gap-8 md:gap-12">
                <div>
                   <h3 className="text-2xl md:text-4xl font-bold text-white mb-1">15+</h3>
                   <p className="text-accent text-xs md:text-sm">سنة خبرة</p>
                </div>
                <div>
                   <h3 className="text-2xl md:text-4xl font-bold text-white mb-1">250+</h3>
                   <p className="text-accent text-xs md:text-sm">مشروع ناجح</p>
                </div>
                <div>
                   <h3 className="text-2xl md:text-4xl font-bold text-white mb-1">50+</h3>
                   <p className="text-accent text-xs md:text-sm">جوائز تقديرية</p>
                </div>
            </div>

            <button className="bg-white text-primary px-6 py-3 md:px-8 md:py-4 rounded-sm font-bold hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-3 group mt-4 text-sm md:text-base">
               <span>تعرف على فريقنا</span>
               <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          {/* Image Composition Section (Left Side in RTL) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
          >
             <div className="relative w-full aspect-[4/5] lg:aspect-square">
                {/* Main Image */}
                <div className="absolute top-0 right-0 w-[85%] h-[85%] z-10">
                   <img 
                     src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                     className="w-full h-full object-cover rounded-sm shadow-2xl"
                     alt="Architecture Office"
                   />
                </div>
                
                {/* Secondary Image */}
                <div className="absolute bottom-0 left-0 w-[55%] h-[45%] z-20 border-4 md:border-8 border-primary">
                   <img 
                     src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                     className="w-full h-full object-cover rounded-sm"
                     alt="Detail"
                   />
                </div>

                {/* Decorative Frame */}
                <div className="absolute top-10 -right-6 w-full h-full border border-white/10 rounded-sm -z-0 hidden lg:block"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-[40%] -left-4 z-30 bg-accent p-4 md:p-6 rounded-sm shadow-xl hidden md:block">
                   <Building className="text-white w-6 h-6 md:w-8 md:h-8 mb-2" />
                   <p className="text-white font-bold text-xs md:text-sm leading-tight">تصاميم<br/>مبتكرة</p>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
