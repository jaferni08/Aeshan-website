
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Lightbulb, HeartHandshake } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "الابتكار المستدام",
    desc: "نستخدم أحدث التقنيات لدمج الاستدامة البيئية مع التصميم العصري.",
    icon: <Lightbulb className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1518005052357-20d2d69d0d83?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "دقة التنفيذ",
    desc: "نلتزم بأعلى معايير الجودة والدقة في كل تفصيلة، مع ضمان التسليم.",
    icon: <Clock className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "شراكة حقيقية",
    desc: "نحن لا نصمم لك فقط، بل نصمم معك. نعتبر العميل شريكاً.",
    icon: <HeartHandshake className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "ضمان الجودة",
    desc: "نقدم ضمانات شاملة على أعمالنا وتصاميمنا لأننا نثق في جودتنا.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
  }
];

const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section className="py-12 md:py-20 bg-white text-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-8 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-accent font-bold tracking-wider mb-2 text-sm md:text-base">لماذا ايشان؟</h4>
            <h2 className="text-2xl md:text-4xl font-bold">قيمنا تميزنا</h2>
          </motion.div>
        </div>

        {/* Desktop: Horizontal Accordion */}
        <div className="hidden lg:flex gap-4 h-[500px] w-full">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              layout
              onHoverStart={() => setActiveId(feature.id)}
              onClick={() => setActiveId(feature.id)}
              animate={{ 
                flex: activeId === feature.id ? 3.5 : 1,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer isolate shadow-2xl border border-gray-100 group"
            >
              {/* Background Image */}
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ 
                  scale: activeId === feature.id ? 1.05 : 1.2,
                  filter: activeId === feature.id ? "grayscale(0%) brightness(0.7)" : "grayscale(100%) brightness(0.4)" 
                }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <AnimatePresence mode="popLayout">
                  {activeId === feature.id ? (
                    <motion.div 
                      key="active"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-accent text-white shadow-lg border border-white/10">
                           {feature.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                      </div>
                      <p className="text-gray-200 leading-relaxed max-w-lg text-lg font-light">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center h-full"
                    >
                         {/* Icon at top */}
                         <div className="absolute top-8 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 group-hover:bg-accent transition-colors text-white">
                            {feature.icon}
                         </div>
                         
                         {/* Vertical Text */}
                         <div className="absolute bottom-12 rotate-90 origin-center whitespace-nowrap">
                            <span className="text-xl font-bold tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">{feature.title}</span>
                         </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Compact 2-Column Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center flex flex-col items-center justify-center min-h-[160px]"
            >
              <div className="p-3 rounded-full bg-accent/10 text-accent mb-3">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
