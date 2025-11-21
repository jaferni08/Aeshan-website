
import React from 'react';
import { ArrowRight, Save, ImageIcon, Layout, Calendar, MapPin, User, Ruler } from 'lucide-react';
import { ProjectData } from './ProjectDetailsPage';

interface ProjectFormProps {
  initialData?: ProjectData | null;
  onSave: (data: ProjectData) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSave, onCancel }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const project: ProjectData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      desc: formData.get('desc') as string,
      fullDesc: formData.get('fullDesc') as string,
      img: formData.get('img') as string,
      year: formData.get('year') as string,
      location: formData.get('location') as string,
      client: formData.get('client') as string,
      area: formData.get('area') as string,
      featured: formData.get('featured') === 'on'
    };
    
    onSave(project);
  };

  // Common styling for inputs to ensure white background and border
  const inputStyles = "w-full p-3 bg-white border border-slate-200 rounded-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all";

  return (
    <div className="bg-white rounded-sm shadow-sm border border-slate-100 p-8 animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
            <h2 className="text-2xl font-bold text-primary">
            {initialData ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">أدخل تفاصيل المشروع بدقة لعرضها في الموقع</p>
        </div>
        <button 
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
        >
            <ArrowRight size={20} />
            <span>العودة للقائمة</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">عنوان المشروع</label>
                <input 
                    name="title" 
                    defaultValue={initialData?.title} 
                    required 
                    placeholder="مثال: فيلا الياسمين"
                    className={inputStyles}
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">التصنيف</label>
                <input 
                    name="category" 
                    defaultValue={initialData?.category} 
                    required 
                    placeholder="مثال: سكني فاخر"
                    className={inputStyles}
                />
            </div>
        </div>

        {/* Section 2: Image */}
        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">صورة المشروع (رابط URL)</label>
            <div className="relative group">
                <input 
                    name="img" 
                    defaultValue={initialData?.img} 
                    required 
                    placeholder="https://example.com/image.jpg"
                    className={`${inputStyles} pl-10`}
                />
                <ImageIcon className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
            </div>
        </div>

        {/* Section 3: Descriptions */}
        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">وصف مختصر (يظهر في البطاقات)</label>
            <textarea 
                name="desc" 
                defaultValue={initialData?.desc} 
                rows={2} 
                required 
                placeholder="وصف قصير لا يتجاوز سطرين..."
                className={inputStyles}
            />
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">الوصف الكامل (صفحة التفاصيل)</label>
            <textarea 
                name="fullDesc" 
                defaultValue={initialData?.fullDesc} 
                rows={6} 
                required 
                placeholder="اكتب التفاصيل الكاملة عن المشروع، الفكرة التصميمية، التحديات، والحلول..."
                className={inputStyles}
            />
        </div>

        {/* Section 4: Details Grid */}
        <div className="bg-slate-50 p-6 rounded-sm border border-slate-100">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Layout size={20} className="text-accent" />
                بيانات إضافية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 flex items-center gap-1"><Calendar size={14}/> السنة</label>
                    <input name="year" defaultValue={initialData?.year} className="w-full p-2 bg-white border border-slate-200 rounded-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="2023" />
                </div>
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 flex items-center gap-1"><MapPin size={14}/> الموقع</label>
                    <input name="location" defaultValue={initialData?.location} className="w-full p-2 bg-white border border-slate-200 rounded-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="الرياض" />
                </div>
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 flex items-center gap-1"><User size={14}/> العميل</label>
                    <input name="client" defaultValue={initialData?.client} className="w-full p-2 bg-white border border-slate-200 rounded-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="اسم العميل" />
                </div>
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 flex items-center gap-1"><Ruler size={14}/> المساحة</label>
                    <input name="area" defaultValue={initialData?.area} className="w-full p-2 bg-white border border-slate-200 rounded-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="450 م²" />
                </div>
            </div>
        </div>

        {/* Section 5: Settings */}
        <div className="flex items-center gap-3 p-4 border border-accent/20 bg-accent/5 rounded-sm">
            <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-5 h-5 accent-accent" />
            <label htmlFor="featured" className="font-bold text-primary cursor-pointer select-none">
                تعيين كمشروع مميز
                <span className="block text-xs text-slate-500 font-normal">سيظهر هذا المشروع بشكل بارز في الصفحة الرئيسية وصفحة المشاريع</span>
            </label>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
            <button 
                type="button" 
                onClick={onCancel}
                className="px-6 py-3 rounded-sm text-slate-600 hover:bg-slate-100 transition-colors font-bold"
            >
                إلغاء
            </button>
            <button 
                type="submit" 
                className="px-8 py-3 rounded-sm bg-accent text-white hover:bg-primary transition-all shadow-lg hover:shadow-xl font-bold flex items-center gap-2"
            >
                <Save size={20} />
                حفظ المشروع
            </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
