
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Droplet, Factory, HardHat, ShieldCheck, CheckCircle2, Phone, Download, Wrench, Zap, Hammer, Video, Mail, MapPin, FileText, Award } from 'lucide-react';

interface OilPageProps {
  onBack: () => void;
}

const OilPage: React.FC<OilPageProps> = ({ onBack }) => {
  
  const handleDownloadProfile = () => {
      // In a real scenario, this would be the path to the PDF file
      alert('جاري تحميل الملف التعريفي للشركة...');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-cairo" dir="rtl">
      
      {/* --- Navbar --- */}
      <nav className="fixed w-full z-50 bg-white shadow-md h-20 flex items-center transition-all">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-oil-accent text-white flex items-center justify-center rounded-sm shadow-sm">
                <span className="font-bold text-xl">ES</span>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 leading-none">ايشان العراق</span>
                <span className="text-[10px] text-slate-500 font-semibold mt-1 tracking-wider">للتجارة والمقاولات العامة المحدودة</span>
            </div>
          </div>
          
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-base font-medium text-slate-600 hover:text-oil-accent hover:bg-orange-50 px-5 py-2.5 rounded-sm transition-all border border-transparent hover:border-orange-100"
          >
             <span>العودة للرئيسية</span>
             <ArrowRight size={20} className="rotate-180" />
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                {/* Text Content */}
                <div className="lg:w-1/2 order-2 lg:order-1">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-oil-accent px-4 py-2 rounded-sm text-sm font-bold mb-6">
                            <CheckCircle2 size={18} />
                            <span>مسجلة رسمياً: 87476</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.3] mb-6">
                            شركة ايشان العراق <br/>
                            <span className="text-oil-accent text-3xl md:text-5xl">للتجارة والمقاولات العامة</span>
                        </h1>
                        <h2 className="text-xl text-slate-500 font-bold mb-8 font-sans ltr">
                            ESHAN IRAQ for General Trade and Contracting L.L.C.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium border-r-4 border-oil-accent pr-6">
                             جزء من مجموعة شركات البيان. خبرة ميدانية متميزة منذ عام 2006 في قطاعات النفط، الغاز، والبنى التحتية. نعمل مع كبرى الشركات العالمية مثل Samsung Engineering و Lukoil.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact-oil" className="bg-oil-accent text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 transform active:scale-95">
                                <Phone size={22} />
                                تواصل معنا
                            </a>
                            <button 
                                onClick={handleDownloadProfile}
                                className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-sm font-bold text-lg hover:border-oil-accent hover:text-oil-accent transition-all flex items-center justify-center gap-3"
                            >
                                <Download size={22} />
                                تحميل الملف التعريفي
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Image */}
                <div className="lg:w-1/2 order-1 lg:order-2 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-sm overflow-hidden shadow-2xl border-8 border-slate-50 group"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop" 
                            alt="Industrial Engineering" 
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </motion.div>
                    {/* Floating Badge */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-sm shadow-xl border border-slate-100 flex items-center gap-4"
                    >
                        <div className="bg-green-100 p-3 rounded-sm text-green-600">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-bold">الجودة والسلامة</p>
                            <p className="text-lg font-bold text-slate-900">ISO Certified</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </header>

      {/* --- About / History Section --- */}
      <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="lg:w-1/3 bg-slate-50 p-8 rounded-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Activity className="text-oil-accent" />
                        بيانات الشركة
                    </h3>
                    <ul className="space-y-4">
                        <li className="border-b border-slate-200 pb-3">
                            <span className="block text-xs text-slate-500 mb-1">تاريخ التأسيس</span>
                            <span className="font-bold text-slate-800">15 نوفمبر 2014</span>
                        </li>
                        <li className="border-b border-slate-200 pb-3">
                            <span className="block text-xs text-slate-500 mb-1">رقم التسجيل</span>
                            <span className="font-bold text-oil-accent text-xl">87476</span>
                        </li>
                         <li className="border-b border-slate-200 pb-3">
                            <span className="block text-xs text-slate-500 mb-1">رأس المال</span>
                            <span className="font-bold text-slate-800">1,000,000,000 دينار عراقي</span>
                        </li>
                        <li>
                            <span className="block text-xs text-slate-500 mb-1">النشاط</span>
                            <span className="font-bold text-slate-800">تجارة عامة ومقاولات</span>
                        </li>
                    </ul>
                </div>
                <div className="lg:w-2/3">
                    <span className="text-oil-accent font-bold tracking-wider uppercase mb-2 block">نبذة عن الشركة</span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">تاريخ من التميز والالتزام</h2>
                    <div className="prose prose-lg text-slate-600 leading-loose max-w-none">
                        <p>
                            تمتلك كوادر <strong>شركة ايشان العراق</strong> خبرة واسعة في العمل الميداني تمتد منذ عام 2006. تم تأسيس الشركة وتسجيلها رسمياً كشركة للتجارة والمقاولات العامة محدودة المسؤولية في عام 2014، مع التركيز الرئيسي على قطاعات النفط والغاز في العراق، وطموح لتوسيع الخدمات في منطقة الشرق الأوسط.
                        </p>
                        <p>
                            ايشان هي جزء من <strong>مجموعة شركات البيان</strong>، وقد عملت مع شركات عالمية رصينة في مشاريع حيوية، منها:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                            <div className="flex items-center gap-3 bg-white p-4 rounded-sm border border-slate-100 shadow-sm">
                                <CheckCircle2 className="text-oil-accent shrink-0" />
                                <span>Samsung Engineering / حقل غرب القرنة 2</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-4 rounded-sm border border-slate-100 shadow-sm">
                                <CheckCircle2 className="text-oil-accent shrink-0" />
                                <span>Lukoil Oil Company</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-4 rounded-sm border border-slate-100 shadow-sm">
                                <CheckCircle2 className="text-oil-accent shrink-0" />
                                <span>Eni Al-Zubair</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-4 rounded-sm border border-slate-100 shadow-sm">
                                <CheckCircle2 className="text-oil-accent shrink-0" />
                                <span>شركات القطاع العام والمختلط</span>
                            </div>
                        </div>
                        <p>
                            نعتمد سياسة عمل رصينة لتقديم أفضل الخدمات لعملائنا بجودة عالية وضمن الإطار الزمني المتفق عليه. نمتلك القدرة على التعامل مع الشركات الأخرى وتكوين شراكات ومشاريع مشتركة (Joint Venture) لتوسيع الأعمال عند الحاجة.
                        </p>
                    </div>
                </div>
            </div>
          </div>
      </section>

      {/* --- Services Section --- */}
      <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-oil-accent font-bold tracking-wider uppercase bg-orange-100 px-4 py-2 rounded-sm text-sm">خدماتنا</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-6">تخطيط وتنفيذ المشاريع & التجهيز العام</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                      نقدم حلولاً متكاملة تشمل الإنشاءات، الأعمال الكهربائية والميكانيكية، بالإضافة إلى خدمات التجهيز للمواد والمعدات.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 {/* Section I */}
                 <div className="bg-white p-8 rounded-sm shadow-md border-t-4 border-oil-accent">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <Hammer className="text-oil-accent" />
                        القسم الأول: اعداد وتنفيذ المشاريع
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "الإنشاءات والبنى التحتية (Construction)",
                            "الأعمال الكهربائية (Electric)",
                            "الأعمال الميكانيكية (Mechanic)",
                            "الصيانة العامة (General Maintenance)",
                            "مشاريع أخرى (IT, CCTV, FOC)"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-sm">
                                <span className="w-2 h-2 bg-oil-accent rounded-full"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                 </div>

                 {/* Section II */}
                 <div className="bg-white p-8 rounded-sm shadow-md border-t-4 border-blue-600">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <Factory className="text-blue-600" />
                        القسم الثاني: التجهيز العام وتأجير المعدات
                    </h3>
                    <ul className="space-y-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {[
                            "مواد الصناعات النفطية ومنتجات المعالجة والغاز.",
                            "مواد البناء والهياكل الفولاذية والمواد اللاصقة والأصباغ.",
                            "تجهيز وتركيب محطات الكهرباء الثانوية (33/11 KV, 132/33 KV) وخطوط النقل.",
                            "معدات تسوية المواقع والرصف والعلامات الإرشادية.",
                            "البوابات الهيدروليكية والكهربائية والأمنية (Sliding & Boom Gates).",
                            "أنظمة الخلايا الشمسية (إنارة، كاميرات، تحكم).",
                            "أنظمة مكافحة الحرائق والإنذار المبكر.",
                            "المولدات الكهربائية والضواغط الهوائية ومعدات IT.",
                            "الخدمات النفطية والاستيراد والتصدير."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-700 border-b border-slate-100 pb-2 last:border-0">
                                <CheckCircle2 size={18} className="text-blue-600 mt-1 shrink-0" />
                                <span className="text-sm font-medium leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
              </div>
          </div>
      </section>

      {/* --- HSE Policy Section (Brand Aligned) --- */}
      <section className="py-24 bg-oil-dark text-white relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10">
               <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                   
                   {/* Text Content (Right) */}
                   <div className="lg:w-1/2 order-1">
                       <motion.div 
                           initial={{ opacity: 0, x: 30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8 }}
                       >
                           <div className="inline-flex items-center gap-2 bg-oil-accent/20 border border-oil-accent/30 text-oil-accent px-4 py-1.5 rounded-sm text-sm font-bold mb-6">
                               <ShieldCheck size={16} />
                               <span>التزامنا بالجودة والسلامة</span>
                           </div>
                           
                           <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight font-cairo text-white">
                               سياسة الصحة والسلامة والبيئة <br/>
                               <span className="text-oil-accent">(HSE)</span>
                           </h2>
                           
                           <p className="text-slate-400 text-lg leading-loose mb-8 font-light border-r-2 border-slate-700 pr-4">
                               إن نجاح الأعمال على المدى الطويل لشركة ايشان يعتمد على قدرتنا على التحسين المستمر لجودة خدماتنا ومنتجاتنا مع حماية الناس والبيئة.
                           </p>
                           
                           <ul className="space-y-5">
                               <li className="flex items-center gap-4">
                                   <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                                   <span className="text-lg text-slate-300">حماية صحة وسلامة موظفينا والمجتمع.</span>
                               </li>
                               <li className="flex items-center gap-4">
                                   <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                                   <span className="text-lg text-slate-300">الامتثال للقوانين واللوائح البيئية.</span>
                               </li>
                               <li className="flex items-center gap-4">
                                   <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                                   <span className="text-lg text-slate-300">القضاء على الحوادث وتحقيق بيئة خالية من المخاطر.</span>
                               </li>
                           </ul>
                       </motion.div>
                   </div>

                   {/* Visual/Card Content (Left) */}
                   <div className="lg:w-1/2 order-2">
                       <motion.div 
                           initial={{ opacity: 0, x: -30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8, delay: 0.2 }}
                           className="relative"
                       >
                           {/* Industrial Pattern Card */}
                           <div className="relative z-10 bg-oil-slate/80 backdrop-blur-xl border-l-4 border-oil-accent p-10 rounded-sm shadow-2xl">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-oil-accent/10 rounded-bl-full pointer-events-none"></div>
                               
                               <h3 className="text-3xl font-bold text-white mb-2 text-center">شهادات الآيزو</h3>
                               <p className="text-oil-accent text-center mb-8 font-bold text-lg">International Standards</p>
                               
                               <div className="space-y-4 mb-8">
                                   <div className="flex items-center justify-between bg-oil-dark p-4 rounded-sm border border-slate-700 group hover:border-oil-accent transition-colors">
                                       <span className="font-mono font-bold text-slate-300">OHSAS 18001:2007</span>
                                       <ShieldCheck className="text-green-500" size={20} />
                                   </div>
                                   <div className="flex items-center justify-between bg-oil-dark p-4 rounded-sm border border-slate-700 group hover:border-oil-accent transition-colors">
                                       <span className="font-mono font-bold text-slate-300">ISO 14001:2015</span>
                                       <ShieldCheck className="text-green-500" size={20} />
                                   </div>
                                   <div className="flex items-center justify-between bg-oil-dark p-4 rounded-sm border border-slate-700 group hover:border-oil-accent transition-colors">
                                       <span className="font-mono font-bold text-slate-300">ISO 9001:2015</span>
                                       <ShieldCheck className="text-green-500" size={20} />
                                   </div>
                               </div>

                               <div className="text-center pt-6 border-t border-slate-700/50">
                                   <p className="text-slate-500 text-xs">
                                       * حاصلون على شهادات المطابقة لنظام إدارة الجودة
                                   </p>
                               </div>
                           </div>
                           
                           {/* Background Decoration */}
                           <div className="absolute -z-10 top-6 left-6 w-full h-full border-2 border-slate-700 rounded-sm"></div>
                       </motion.div>
                   </div>
               </div>
           </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact-oil" className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <div className="bg-slate-50 rounded-sm shadow-lg border border-slate-200 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-10 lg:p-16">
                          <h2 className="text-3xl font-bold text-slate-900 mb-8">اتصل بنا</h2>
                          <div className="space-y-8">
                              <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-oil-accent/10 text-oil-accent rounded-sm flex items-center justify-center shrink-0">
                                      <MapPin size={24} />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-lg text-slate-900 mb-1">العنوان</h3>
                                      <p className="text-slate-600">العراق - البصرة</p>
                                      <p className="text-slate-500 text-sm">الفرع الأول: البصرة - البريهة</p>
                                      <p className="text-slate-500 text-sm">الفرع الثاني: البصرة - المدينة</p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-oil-accent/10 text-oil-accent rounded-sm flex items-center justify-center shrink-0">
                                      <Phone size={24} />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-lg text-slate-900 mb-1">الهاتف</h3>
                                      <p className="text-slate-600 text-lg" dir="ltr">+964 780 101 1336</p>
                                      <p className="text-slate-600 text-lg" dir="ltr">+964 771 267 8000</p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-oil-accent/10 text-oil-accent rounded-sm flex items-center justify-center shrink-0">
                                      <Mail size={24} />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-lg text-slate-900 mb-1">البريد الإلكتروني</h3>
                                      <p className="text-slate-600 font-medium">info@eshaniraq.com</p>
                                      <p className="text-slate-600 font-medium">3xeshan@gmail.com</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="bg-oil-dark p-10 lg:p-16 text-white flex flex-col justify-center items-center text-center">
                          <div className="mb-8">
                              <h3 className="text-2xl font-bold mb-2">ملف الشركة</h3>
                              <p className="text-slate-400">حمل الملف التعريفي الكامل بصيغة PDF</p>
                          </div>
                          <button 
                             onClick={handleDownloadProfile}
                             className="bg-oil-accent text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-orange-600 transition-all shadow-xl flex items-center gap-3 w-full justify-center max-w-xs"
                          >
                              <Download size={24} />
                              تحميل الملف
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-oil-dark text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
          <div className="container mx-auto px-6">
              <p>&copy; {new Date().getFullYear()} ESHAN IRAQ for General Trade and Contracting L.L.C. جميع الحقوق محفوظة.</p>
          </div>
      </footer>

    </div>
  );
};

export default OilPage;
