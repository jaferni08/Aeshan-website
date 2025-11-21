
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ArrowUpLeft, Factory, UserCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (page: 'home' | 'oil' | 'login') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy Logic
      const sections = ['hero', 'services', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset to trigger earlier

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'أعمالنا', href: '#projects' },
    { name: 'من نحن', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3 border-b border-white/20'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center h-12">
          
          {/* --- Logo Area --- */}
          <div className="flex-shrink-0 w-[140px] flex justify-start">
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-3 group"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-sm text-lg font-bold transition-all duration-300 ${
                isScrolled 
                  ? 'bg-primary text-white group-hover:bg-accent' 
                  : 'bg-white text-primary group-hover:bg-accent group-hover:text-white'
              }`}>
                ا
              </div>
              <span className={`text-2xl font-bold tracking-tighter transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}>
                ايشان
              </span>
            </a>
          </div>

          {/* --- Desktop/Tablet Navigation (Centered) --- */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-12">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              const baseColor = isScrolled ? 'text-primary' : 'text-white';
              const hoverColor = isScrolled ? 'group-hover:text-accent' : 'group-hover:text-white';
              const activeColor = 'text-accent';
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative group py-2 text-sm lg:text-base font-medium tracking-wide transition-colors duration-300 ${isActive ? activeColor : `${baseColor} ${hoverColor}`}`}
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 right-0 w-full h-[2px] bg-accent rounded-full transform origin-right transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </a>
              );
            })}
            
            {/* Oil Industry Link */}
            <button
               onClick={() => onNavigate('oil')}
               className={`flex items-center gap-2 py-2 text-sm lg:text-base font-medium tracking-wide transition-colors duration-300 group ${
                 isScrolled ? 'text-primary hover:text-oil-accent' : 'text-white hover:text-oil-accent'
               }`}
            >
                <Factory size={16} />
                <span>قطاع النفط</span>
            </button>
          </div>

          {/* --- Actions Area (CTA + Login + Mobile Toggle) --- */}
          <div className="flex-shrink-0 flex justify-end items-center gap-4">
            {/* Login Button (Desktop) */}
            <button 
              onClick={() => onNavigate('login')}
              className={`hidden md:flex items-center gap-2 text-sm font-bold transition-colors duration-300 ${isScrolled ? 'text-primary hover:text-accent' : 'text-white hover:text-accent'}`}
            >
              <UserCircle size={20} />
              <span>دخول</span>
            </button>

            {/* CTA Button - Visible on Tablet & Desktop */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-bold transition-all duration-300 group ${
                isScrolled
                  ? 'bg-primary text-white hover:bg-accent hover:shadow-lg'
                  : 'bg-white text-primary hover:bg-accent hover:text-white backdrop-blur-sm'
              }`}
            >
              <span>تواصل معنا</span>
              <ArrowUpLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Mobile Menu Toggle - Only on Mobile */}
            <button
              className={`md:hidden relative z-[110] p-2 transition-colors duration-300 ${
                isMobileMenuOpen 
                  ? 'text-white' 
                  : (isScrolled ? 'text-primary hover:text-accent' : 'text-white hover:text-accent')
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 h-[100dvh] bg-zinc-900/98 backdrop-blur-xl z-[100] flex flex-col overflow-hidden"
            >
              {/* Decorative Background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
               </div>

              {/* Header */}
              <div className="container mx-auto px-6 h-24 flex justify-between items-center relative z-10 border-b border-white/10 shrink-0">
                 <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-sm text-white font-bold">ا</div>
                     <span className="text-white font-bold text-xl">القائمة</span>
                 </div>
                 {/* Close Button Inside Portal */}
                 <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white hover:text-accent transition-colors"
                 >
                    <X size={28} />
                 </button>
              </div>
              
              {/* Links */}
              <div className="flex-1 container mx-auto px-6 flex flex-col justify-start pt-10 relative z-10 overflow-y-auto scrollbar-hide">
                 <motion.div 
                   className="flex flex-col gap-4 pb-10"
                   initial="hidden"
                   animate="visible"
                   exit="hidden"
                   variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                   }}
                 >
                    {navLinks.map((link, index) => (
                       <div key={link.name} className="overflow-hidden">
                           <motion.div
                             variants={{
                                hidden: { y: "100%" },
                                visible: { y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
                             }}
                           >
                              <motion.a
                                whileTap={{ scale: 0.98 }}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`group flex items-center justify-between py-4 border-b border-white/10 ${activeSection === link.href.replace('#', '') ? 'text-accent' : 'text-white'}`}
                              >
                                 <span className="text-3xl font-bold group-hover:text-accent transition-colors">{link.name}</span>
                                 <span className="text-xs font-mono text-white/30 group-hover:text-accent transition-colors">0{index + 1}</span>
                              </motion.a>
                           </motion.div>
                       </div>
                    ))}

                     {/* Special Links */}
                     <div className="overflow-hidden pt-6">
                        <motion.div
                             variants={{
                                hidden: { y: "100%" },
                                visible: { y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
                             }}
                             className="flex flex-col gap-4"
                           >
                             <button
                                onClick={() => { setIsMobileMenuOpen(false); onNavigate('oil'); }}
                                className="flex items-center gap-3 text-white/70 hover:text-oil-accent transition-colors text-lg py-2"
                             >
                                <Factory size={20} />
                                <span>قطاع النفط والطاقة</span>
                             </button>

                             <button
                                onClick={() => { setIsMobileMenuOpen(false); onNavigate('login'); }}
                                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-lg py-2"
                             >
                                <UserCircle size={20} />
                                <span>تسجيل الدخول</span>
                             </button>
                        </motion.div>
                     </div>

                 </motion.div>
              </div>

              {/* Footer */}
              <div className="container mx-auto px-6 py-8 border-t border-white/10 relative z-10 bg-zinc-900/90 backdrop-blur-md shrink-0">
                  <div className="flex flex-col gap-4 text-white/40 text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <p>© 2023 Eishan Architecture.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">IG</a>
                            <a href="#" className="hover:text-white transition-colors">LN</a>
                            <a href="#" className="hover:text-white transition-colors">TW</a>
                        </div>
                      </div>
                      <p className="text-white/20 text-[10px]">DESIGNED WITH PRECISION</p>
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navbar;
