import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, HardHat, Key } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "الاستشارة الأولية",
    desc: "نجتمع معك لفهم رؤيتك واحتياجاتك، وتحديد الميزانية والجدول الزمني.",
    icon: <MessageSquare size={20} className="md:w-6 md:h-6" />
  },
  {
    num: "02",
    title: "التصميم والمفهوم",
    desc: "يقوم فريقنا بتحويل أفكارك إلى مخططات وتصاميم ثلاثية الأبعاد تعكس هويتك.",
    icon: <PenTool size={20} className="md:w-6 md:h-6" />
  },
  {
    num: "03",
    title: "التطوير والتنفيذ",
    desc: "نبدأ في مرحلة البناء والإشراف الهندسي الدقيق لضمان جودة التنفيذ.",
    icon: <HardHat size={20} className="md:w-6 md:h-6" />
  },
  {
    num: "04",
    title: "التسليم النهائي",
    desc: "نسلمك مفتاح مشروعك بعد التأكد من اكتمال كافة التفاصيل وضمان رضاك.",
    icon: <Key size={20} className="md:w-6 md:h-6" />
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-20">
          <h4 className="text-accent font-bold tracking-wider mb-2 text-sm md:text-base">رحلة العمل</h4>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">كيف نحقق رؤيتك</h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-4 gap-8 relative z-10">
           {/* Connecting Line */}
          <div className="absolute top-[32px] right-0 w-full h-0.5 bg-gray-100 -z-10"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group text-right relative"
            >
              <div className="w-16 h-16 mr-0 mb-6 rounded-full bg-white border-4 border-secondary group-hover:border-accent transition-colors flex items-center justify-center shadow-sm relative">
                 <span className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{step.num}</span>
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary">
                    {step.icon}
                 </div>
              </div>

              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed pl-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Timeline Layout */}
        <div className="md:hidden relative">
          {/* Vertical Line */}
          <div className="absolute top-2 bottom-2 right-[15px] w-0.5 bg-gray-200"></div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative pr-12">
                {/* Node on Line */}
                <div className="absolute right-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-accent flex items-center justify-center z-10 shadow-sm">
                   <span className="text-xs font-bold text-primary">{step.num}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;