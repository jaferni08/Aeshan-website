
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { authClient } from '../lib/auth-client';

interface LoginPageProps {
  onBack: () => void;
  onNavigateToRegister: () => void;
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack, onNavigateToRegister, onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "حدث خطأ أثناء تسجيل الدخول");
      } else if (data) {
        onLogin();
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
        className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative"
      >
        <button 
          onClick={onBack}
          className="absolute top-8 right-8 flex items-center gap-2 text-gray-500 hover:text-accent transition-colors"
        >
          <ArrowRight size={20} />
          <span className="text-sm font-bold">العودة للرئيسية</span>
        </button>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
               <span className="w-8 h-8 bg-accent text-white flex items-center justify-center rounded-sm text-lg font-bold">ا</span>
               <span className="text-2xl font-bold text-primary tracking-tighter">ايشان</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">مرحباً بعودتك</h1>
            <p className="text-gray-500">الرجاء إدخال بياناتك لتسجيل الدخول</p>
            <p className="text-xs text-accent mt-2 bg-accent/10 p-2 rounded-sm inline-block">
              تلميح: استخدم كلمة المرور "password" للتجربة
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-sm text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

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
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-primary block">كلمة المرور</label>
                <a href="#" className="text-xs text-accent hover:underline">نسيت كلمة المرور؟</a>
              </div>
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

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="accent-accent w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">تذكرني</label>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold py-4 rounded-sm hover:bg-accent transition-colors duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "تسجيل الدخول"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              ليس لديك حساب؟ 
              <button onClick={onNavigateToRegister} className="text-accent font-bold mr-1 hover:underline">إنشاء حساب جديد</button>
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
        >
           <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        </motion.div>
        
        <div className="absolute bottom-0 right-0 p-20 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">تصميمات تروي قصصاً</h2>
          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            انضم إلينا واستكشف عالماً من الإبداع المعماري. نحن نصنع مساحات تلهم الحياة وتدوم للأبد.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
