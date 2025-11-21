
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Search,
  ChevronLeft,
  User as UserIcon
} from 'lucide-react';
import { ProjectData } from './ProjectDetailsPage';
import ProjectForm from './ProjectForm';
import ReviewForm from './ReviewForm';
import { authClient, useSession } from '../lib/auth-client';

// Review Interface
export interface ReviewData {
  id: number;
  name: string;
  role: string;
  text: string;
  img: string;
}

interface DashboardProps {
  projects: ProjectData[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectData[]>>;
  reviews: ReviewData[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewData[]>>;
  onLogout: () => void;
}

type Tab = 'projects' | 'reviews';

const Dashboard: React.FC<DashboardProps> = ({ 
  projects, 
  setProjects, 
  reviews, 
  setReviews, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [isFormView, setIsFormView] = useState(false); 
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: session } = useSession();

  const handleSignOut = async () => {
      await authClient.signOut();
      onLogout();
  };

  // -- Handlers for Projects --
  const handleAddProject = () => {
    setEditingItem(null); // New item
    setIsFormView(true);
  };

  const handleEditProject = (project: ProjectData) => {
    setEditingItem(project);
    setIsFormView(true);
  };

  const handleDeleteProject = (title: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      setProjects(prev => prev.filter(p => p.title !== title));
    }
  };

  const handleSaveProject = (project: ProjectData) => {
    if (editingItem) {
      // Update existing - identify by original title (assuming title is unique for now, or add ID in real app)
      setProjects(prev => prev.map(p => p.title === editingItem.title ? project : p));
    } else {
      // Add new
      setProjects(prev => [project, ...prev]);
    }
    setIsFormView(false);
  };

  // -- Handlers for Reviews --
  const handleAddReview = () => {
    setEditingItem(null);
    setIsFormView(true);
  };

  const handleEditReview = (review: ReviewData) => {
    setEditingItem(review);
    setIsFormView(true);
  };

  const handleDeleteReview = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSaveReview = (review: ReviewData) => {
    if (editingItem) {
      setReviews(prev => prev.map(r => r.id === editingItem.id ? review : r));
    } else {
      setReviews(prev => [review, ...prev]);
    }
    setIsFormView(false);
  };

  // Filter Logic
  const filteredProjects = projects.filter(p => p.title.includes(searchTerm));
  const filteredReviews = reviews.filter(r => r.name.includes(searchTerm));

  // Form View (Projects or Reviews)
  if (isFormView) {
    return (
        <div className="min-h-screen bg-slate-50 flex font-cairo text-slate-800">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 bg-primary text-white fixed h-full z-20 flex flex-col">
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10">
                    <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-bold ml-0 lg:ml-3">ا</div>
                    <span className="text-xl font-bold hidden lg:block">لوحة التحكم</span>
                </div>
                <div className="p-4">
                    <button 
                        onClick={() => setIsFormView(false)}
                        className="w-full flex items-center gap-3 p-3 rounded-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="hidden lg:block text-sm font-medium">عودة</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 mr-20 lg:mr-64 p-8 transition-all duration-300">
                {activeTab === 'projects' ? (
                  <ProjectForm 
                      initialData={editingItem} 
                      onSave={handleSaveProject} 
                      onCancel={() => setIsFormView(false)}
                  />
                ) : (
                  <ReviewForm 
                      initialData={editingItem} 
                      onSave={handleSaveReview} 
                      onCancel={() => setIsFormView(false)}
                  />
                )}
            </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-cairo text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-primary text-white fixed h-full z-20 flex flex-col transition-all duration-300">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10">
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-bold ml-0 lg:ml-3">ا</div>
          <span className="text-xl font-bold hidden lg:block">لوحة التحكم</span>
        </div>

        <div className="p-6 flex items-center gap-3 border-b border-white/10 bg-white/5">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white overflow-hidden">
                {session?.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                ) : (
                    <UserIcon size={20} />
                )}
            </div>
            <div className="hidden lg:block overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{session?.user.name || 'مستخدم'}</p>
                <p className="text-xs text-gray-400 truncate">{session?.user.email}</p>
            </div>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-2">
          <button 
            onClick={() => { setActiveTab('projects'); setIsFormView(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-sm transition-colors ${activeTab === 'projects' ? 'bg-accent text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={20} className="min-w-[20px]" />
            <span className="hidden lg:block text-sm font-medium">المشاريع</span>
          </button>
          <button 
            onClick={() => { setActiveTab('reviews'); setIsFormView(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-sm transition-colors ${activeTab === 'reviews' ? 'bg-accent text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <MessageSquare size={20} className="min-w-[20px]" />
            <span className="hidden lg:block text-sm font-medium">الآراء والتقييمات</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 p-3 rounded-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} className="min-w-[20px]" />
            <span className="hidden lg:block text-sm font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-20 lg:mr-64 p-8 transition-all duration-300">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">
              {activeTab === 'projects' ? 'إدارة المشاريع' : 'إدارة التقييمات'}
            </h1>
            <p className="text-slate-500 text-sm">قم بإدارة محتوى الموقع بسهولة</p>
          </div>
          
          <button 
            onClick={activeTab === 'projects' ? handleAddProject : handleAddReview}
            className="bg-accent text-white px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-primary transition-colors shadow-md"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">إضافة جديد</span>
          </button>
        </header>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-sm shadow-sm mb-6 flex items-center gap-3 border border-slate-100">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="بحث..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-slate-700 bg-transparent"
          />
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {activeTab === 'projects' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.div 
                    key={idx}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-2">
                         {project.featured && (
                             <span className="bg-accent text-white text-xs px-2 py-1 rounded-sm shadow-sm">مميز</span>
                         )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-primary line-clamp-1">{project.title}</h3>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-sm whitespace-nowrap">{project.category}</span>
                      </div>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2">{project.desc}</p>
                      
                      <div className="flex gap-2 pt-4 border-t border-slate-50">
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="flex-1 flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded-sm text-xs font-bold transition-colors"
                        >
                          <Edit size={14} /> تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.title)}
                          className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-sm text-xs font-bold transition-colors"
                        >
                          <Trash2 size={14} /> حذف
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredReviews.map((review) => (
                  <motion.div 
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6"
                  >
                    <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
                    <div className="flex-1 text-center md:text-right">
                      <h3 className="font-bold text-primary">{review.name}</h3>
                      <p className="text-accent text-xs mb-2">{review.role}</p>
                      <p className="text-slate-600 text-sm italic">"{review.text}"</p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                          onClick={() => handleEditReview(review)}
                          className="p-2 text-slate-400 hover:text-accent hover:bg-slate-50 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
