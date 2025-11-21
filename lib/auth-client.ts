
import { useState, useEffect } from 'react';

// --- MOCK TYPES matching Better Auth ---
export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

interface AuthContextType {
  data: {
    session: Session;
    user: User;
  } | null;
  isPending: boolean;
  error: { message: string } | null;
}

// --- SIMULATED DATABASE (LocalStorage) ---
const STORAGE_KEY = 'better-auth-mock-session';

const mockUser: User = {
  id: "user_123",
  email: "demo@eishan.com",
  name: "مدير النظام",
  emailVerified: true,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockSession: Session = {
  id: "session_abc",
  userId: "user_123",
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
};

// --- CLIENT IMPLEMENTATION ---

export const authClient = {
  signIn: {
    email: async ({ email, password }: any) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password === "password") { // Simple mock validation
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: { ...mockUser, email }, session: mockSession }));
        window.dispatchEvent(new Event('storage')); // Trigger update
        return { data: { user: mockUser, session: mockSession }, error: null };
      }
      
      return { data: null, error: { message: "بيانات الدخول غير صحيحة" } };
    }
  },
  signUp: {
    email: async ({ email, name, password }: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = { ...mockUser, email, name };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: newUser, session: mockSession }));
      window.dispatchEvent(new Event('storage'));
      
      return { data: { user: newUser, session: mockSession }, error: null };
    }
  },
  signOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('storage'));
    return { data: { success: true }, error: null };
  }
};

// --- HOOK IMPLEMENTATION ---
export function useSession() {
  const [sessionData, setSessionData] = useState<{ session: Session; user: User } | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      setIsPending(true);
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSessionData(JSON.parse(stored));
        } else {
          setSessionData(null);
        }
      } catch (e) {
        setSessionData(null);
      } finally {
        setIsPending(false);
      }
    };

    checkSession();

    // Listen for changes (login/logout)
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, []);

  return {
    data: sessionData,
    isPending,
    error: null
  };
}
