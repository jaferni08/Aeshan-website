import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: "أحمد المنصور",
    role: "كبير المهندسين",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    socials: [Linkedin, Twitter, Instagram]
  },
  {
    name: "سارة العلي",
    role: "مصممة داخلية",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    socials: [Linkedin, Twitter]
  },
  {
    name: "فهد السالم",
    role: "مهندس إنشائي",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    socials: [Linkedin]
  },
  {
    name: "نورة الشمري",
    role: "مديرة مشاريع",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    socials: [Linkedin, Instagram]
  }
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h4 className="text-accent font-bold tracking-wider text-sm md:text-base">الخبراء</h4>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">فريق العمل المحترف</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-sm mb-4">
                <img src={member.img} alt={member.name} className="w-full h-[280px] md:h-[350px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                {/* Social Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4 text-primary">
                  {member.socials.map((Icon, i) => (
                    <a key={i} href="#" className="hover:text-accent transition-colors"><Icon size={20} /></a>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-bold text-center">{member.name}</h3>
              <p className="text-accent text-center text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;