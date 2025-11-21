
import React from 'react';
import { ArrowRight, Save, User, Briefcase, MessageSquare, ImageIcon } from 'lucide-react';
import { ReviewData } from './Dashboard';

interface ReviewFormProps {
  initialData?: ReviewData | null;
  onSave: (data: ReviewData) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ initialData, onSave, onCancel }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const review: ReviewData = {
      id: initialData?.id || Date.now(),
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      text: formData.get('text') as string,
      img: formData.get('img') as string,
    };
    
    onSave(review);
  };

  // Specific styling requested: white background with borders
  const inputStyles = "w-full p-3 bg-white border border-slate-200 rounded-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-slate-800 placeholder:text-slate-400";

  return (
    <div className="bg-white rounded-sm shadow-sm border border-slate-100 p-8 animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div>
            <h2 className="text-2xl font-bold text-primary">
            {initialData ? 'تعديل التقييم' : 'إضافة تقييم جديد'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">أدخل تفاصيل رأي العميل ليظهر في الصفحة الرئيسية</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">اسم العميل</label>
                <div className="relative">
                   <input 
                       name="name" 
                       defaultValue={initialData?.name} 
                       required 
                       placeholder="الاسم الكامل"
                       className={`${inputStyles} pl-10`}
                   />
                   <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                </div>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">المنصب / الصفة</label>
                <div className="relative">
                   <input 
                       name="role" 
                       defaultValue={initialData?.role} 
                       required 
                       placeholder="مثال: مدير تنفيذي"
                       className={`${inputStyles} pl-10`}
                   />
                   <Briefcase className="absolute left-3 top-3.5 text-slate-400" size={18} />
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">صورة العميل (رابط URL)</label>
            <div className="relative">
                <input 
                    name="img" 
                    defaultValue={initialData?.img} 
                    required 
                    placeholder="https://example.com/photo.jpg"
                    className={`${inputStyles} pl-10`}
                />
                <ImageIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
            </div>
        </div>

        <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">نص التقييم</label>
            <div className="relative">
                <textarea 
                    name="text" 
                    defaultValue={initialData?.text} 
                    rows={4} 
                    required 
                    placeholder="اكتب تجربة العميل هنا..."
                    className={`${inputStyles} pl-10`}
                />
                <MessageSquare className="absolute left-3 top-3.5 text-slate-400" size={18} />
            </div>
        </div>

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
                حفظ التقييم
            </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
