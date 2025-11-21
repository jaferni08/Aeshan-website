
import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Process from './components/Process';
import FeaturedSlider from './components/FeaturedSlider';
import OilPage from './components/OilPage';
import ProjectDetailsPage, { ProjectData } from './components/ProjectDetailsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard, { ReviewData } from './components/Dashboard';
import { useSession } from './lib/auth-client'; // Import the auth hook

// Initial Data for CMS state
const INITIAL_PROJECTS: ProjectData[] = [
  {
    title: "فيلا الياسمين",
    category: "سكني فاخر",
    desc: "فيلا عصرية تتميز بالواجهات الزجاجية الكبيرة التي تدمج الداخل بالخارج، مع استخدام مواد طبيعية مستدامة.",
    fullDesc: "تم تصميم هذه الفيلا بعناية فائقة لتوفير تجربة معمارية فريدة. تتميز بتصميم حديث يجمع بين الأناقة والوظيفة، مع استخدام مواد بيئية مستدامة. الواجهات الزجاجية الكبيرة توفر إضاءة طبيعية وفيرة وتدمج الداخل بسلاسة مع الحدائق الخارجية. يضم المشروع مساحات معيشة مفتوحة، حدائق داخلية، ونظام تكييف ذكي يوفر الطاقة.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    featured: true,
    year: "2023",
    location: "الرياض",
    client: "عائلة خاصة",
    area: "850 متر مربع"
  },
  {
    title: "مقر شركة القمة",
    category: "تجاري / مكاتب",
    desc: "تصميم داخلي لمقر شركة تقنية، يركز على خلق بيئة عمل تعاونية مع مساحات مفتوحة وغرف اجتماعات ذكية.",
    fullDesc: "مقر حديث مصمم بعناية لإلهام الإبداع والتعاون. يتضمن مساحات عمل مفتوحة وغرف اجتماعات مجهزة بأحدث التقنيات. تم استخدام الألوان الهادئة والمواد الطبيعية لتقليل التوتر وزيادة الإنتاجية. يحتوي المكتب أيضاً على مناطق استراحة ترفيهية وكافيتريا بتصميم عصري.",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    featured: false,
    year: "2023",
    location: "الرياض",
    client: "شركة تقنية",
    area: "1200 متر مربع"
  },
  {
    title: "منتجع البحر الأحمر",
    category: "سياحة وضيافة",
    desc: "منتجع بيئي فاخر يمتد على الساحل، مصمم ليتناغم مع الطبيعة المحيطة بأقل تأثير بيئي ممكن.",
    fullDesc: "منتجع سياحي فاخر يجمع بين الرفاهية والاستدامة البيئية. تم تصميمه ليتناغم تماماً مع محيطه الطبيعي باستخدام مواد محلية وتقنيات بناء تقليدية مطورة. يوفر المنتجع فيلات خاصة، مطاعم عالمية، وسبا صحي متكامل، كل ذلك بإطلالات ساحرة على البحر الأحمر.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    year: "2022",
    location: "ساحل البحر الأحمر",
    client: "شركة سياحة",
    area: "5000 متر مربع"
  },
  {
    title: "شقة النخيل",
    category: "مودرن سكني",
    desc: "شقة بنتهاوس بتصميم مينيماليست (تبسيطي)، تركز على الخطوط النظيفة والألوان الهادئة لتوفير أقصى درجات الراحة.",
    fullDesc: "شقة بنتهاوس فخمة بتصميم مينيماليست يركز على البساطة والأناقة. توفر إطلالات بانورامية ومساحات مفتوحة. الأثاث تم اختياره بعناية ليكمل التصميم المعماري، مع التركيز على الراحة والوظيفة. الإضاءة المدروسة تلعب دوراً كبيراً في خلق جو دافئ ومريح.",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    featured: false,
    year: "2023",
    location: "جدة",
    client: "عميل خاص",
    area: "350 متر مربع"
  }
];

const INITIAL_REVIEWS: ReviewData[] = [
  {
    id: 1,
    text: "العمل مع فريق ايشان كان تجربة استثنائية. دقة في المواعيد، إبداع في التصميم، وفهم عميق لاحتياجاتنا. لقد حولوا منزل أحلامنا إلى حقيقة.",
    name: "خالد العتيبي",
    role: "مالك فيلا خاصة",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    text: "احترافية عالية في التعامل وتصاميم تفوق التوقعات. اهتمامهم بالتفاصيل الصغيرة هو ما يميزهم عن غيرهم في السوق.",
    name: "منى الزهراني",
    role: "مديرة تسويق",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  }
];

type ViewState = 
  | { name: 'home' }
  | { name: 'oil' }
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'dashboard' }
  | { name: 'project', data: ProjectData };

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ name: 'home' });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  
  // Auth State
  const { data: session, isPending } = useSession();

  // CMS State
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_REVIEWS);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [view]); 

  // Redirect logic for Auth
  useEffect(() => {
    if (!isPending) {
      if (session && (view.name === 'login' || view.name === 'register')) {
        handleNavigate('dashboard');
      }
    }
  }, [session, isPending, view.name]);

  const triggerTransition = (nextView: ViewState, text: string) => {
    if (isTransitioning) return;
    
    setTransitionText(text);
    setIsTransitioning(true);

    // Phase 1: Wait for the "curtain" to cover the screen
    setTimeout(() => {
      setView(nextView);
      window.scrollTo(0, 0);
    }, 800);

    // Phase 2: Trigger exit animation (lift curtain)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  const handleNavigate = (page: 'home' | 'oil' | 'login' | 'register' | 'dashboard') => {
    // Protected Route Check
    if (page === 'dashboard' && !session) {
       page = 'login';
    }

    let text = '';
    switch(page) {
      case 'home': text = 'الرئيسية'; break;
      case 'oil': text = 'قطاع النفط والطاقة'; break;
      case 'login': text = 'تسجيل الدخول'; break;
      case 'register': text = 'إنشاء حساب'; break;
      case 'dashboard': text = 'لوحة التحكم'; break;
    }
    triggerTransition({ name: page } as ViewState, text);
  };

  const handleProjectSelect = (project: ProjectData) => {
    triggerTransition({ name: 'project', data: project }, project.title);
  };

  const isDarkTheme = view.name === 'oil';

  return (
    <div className={`font-cairo antialiased ${!isDarkTheme ? 'text-primary selection:bg-accent selection:text-white' : 'text-white bg-oil-dark selection:bg-oil-accent selection:text-white'}`}>
      
      {/* Global Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="page-transition-overlay"
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
             <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold tracking-wide text-center px-4"
             >
                {transitionText}
             </motion.h2>
             <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 60, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-1 bg-accent mt-6 rounded-full"
             />
          </motion.div>
        )}
      </AnimatePresence>

      {view.name === 'home' && (
        <>
          <Navbar onNavigate={handleNavigate} />
          <main>
            <Hero />
            <FeaturedSlider projects={projects} onProjectClick={handleProjectSelect} />
            <Services />
            <Process />
            <Projects projects={projects} onProjectClick={handleProjectSelect} />
            <About />
            <Testimonials reviews={reviews} />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {view.name === 'oil' && (
        <OilPage onBack={() => handleNavigate('home')} />
      )}

      {view.name === 'login' && (
        <LoginPage 
          onBack={() => handleNavigate('home')} 
          onNavigateToRegister={() => handleNavigate('register')}
          onLogin={() => handleNavigate('dashboard')}
        />
      )}

      {view.name === 'register' && (
        <RegisterPage 
          onBack={() => handleNavigate('home')}
          onNavigateToLogin={() => handleNavigate('login')}
        />
      )}

      {view.name === 'project' && (
        <ProjectDetailsPage 
          project={view.data}
          allProjects={projects}
          onBack={() => handleNavigate('home')} 
          onProjectClick={handleProjectSelect}
        />
      )}

      {view.name === 'dashboard' && (
        <Dashboard 
          projects={projects}
          setProjects={setProjects}
          reviews={reviews}
          setReviews={setReviews}
          onLogout={() => {
             // Handle local transition, actual signout is called inside Dashboard
             handleNavigate('home');
          }}
        />
      )}

    </div>
  );
};

export default App;
