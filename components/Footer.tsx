
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-dark text-white pt-12 md:pt-20 pb-8 md:pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4 md:mb-6">
              <span className="w-8 h-8 bg-accent text-white flex items-center justify-center rounded-sm">ا</span>
              ايشان
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              نقدم خدمات معمارية متكاملة تجمع بين الإبداع والابتكار لإنشاء مساحات خالدة.
            </p>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">روابط سريعة</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">خدماتنا</a></li>
              <li><a href="#projects" className="hover:text-accent transition-colors">المشاريع</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">من نحن</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">تواصل معنا</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-accent" /> الرياض، طريق الملك فهد</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-accent" /> +966 11 234 5678</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-accent" /> info@eishan.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6">النشرة البريدية</h4>
            <p className="text-gray-500 text-sm mb-4">اشترك للحصول على آخر أخبارنا</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="بريدك الإلكتروني" className="bg-white/5 border border-white/10 p-3 rounded-sm focus:outline-none focus:border-accent text-white text-sm" />
              <button className="bg-accent text-white py-3 rounded-sm hover:bg-white hover:text-primary transition-colors font-bold text-sm">اشترك</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center md:text-right">© 2023 ايشان. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-accent transition-colors"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-accent transition-colors"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-accent transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
