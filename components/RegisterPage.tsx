
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { authClient } from '../lib/auth-client';

interface RegisterPageProps {
  onBack: () => void;
  onNavigateToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onBack, onNavigateToLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setError(error.message || "حدث خطأ أثناء إنشاء الحساب");
      } else if (data) {
        // Automatically redirect to login or dashboard in real app
        // For this flow we just trigger login callback behavior via parent or just go to login
        onNavigateToLogin();
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-cairo">
      
      {/* Form Section (Right Side) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative"
      >
        <button 
          onClick={onBack}
          className="absolute top-8 right-8 flex items-center gap-2 text-gray-500 hover:text-accent transition-colors"
        >
          <ArrowRight size={20} />
          <span className="text-sm font-bold">العودة للرئيسية</span>
        </button>

        <div className="max-w-md w-full mx-auto mt-10 lg:mt-0">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
               <span className="w-8 h-8 bg-accent text-white flex items-center justify-center rounded-sm text-lg font-bold">ا</span>
               <span className="text-2xl font-bold text-primary tracking-tighter">ايشان</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">إنشاء حساب جديد</h1>
            <p className="text-gray-500">انضم إلينا لبدء رحلة البناء الخاصة بك</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-sm text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary block">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  name="name"
                  type="text" 
                  placeholder="الاسم الثلاثي" 
                  className="w-full bg-secondary border border-gray-200 rounded-sm py-3 pr-12 pl-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary block">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-secondary border border-gray-200 rounded-sm py-3 pr-12 pl-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary block">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="w-full bg-secondary border border-gray-200 rounded-sm py-3 pr-12 pl-12 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" className="accent-accent w-4 h-4 mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none leading-relaxed">
                أوافق على <a href="#" className="text-accent hover:underline">شروط الاستخدام</a> و <a href="#" className="text-accent hover:underline">سياسة الخصوصية</a>
              </label>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-4 rounded-sm hover:bg-accent transition-colors duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "إنشاء الحساب"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              لديك حساب بالفعل؟
              <button onClick={onNavigateToLogin} className="text-accent font-bold mr-1 hover:underline">تسجيل الدخول</button>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Image Section (Left Side) */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-primary">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop')" }}
        >
           <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        </motion.div>
        
        <div className="absolute bottom-0 right-0 p-20 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">ابنِ مستقبلك معنا</h2>
          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            سجل الآن واحصل على استشارات حصرية والوصول إلى ملفات مشاريعنا المميزة.
          </p>
        </div>
      </div>

    </div>
  );
};

export default RegisterPage;
