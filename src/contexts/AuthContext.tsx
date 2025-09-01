import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'teacher' | 'hod' | 'principal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: Record<string, { password: string; user: User }> = {
  'teacher@sipna.edu': {
    password: 'teacher123',
    user: {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'teacher@sipna.edu',
      role: 'teacher',
      department: 'Computer Science'
    }
  },
  'hod@sipna.edu': {
    password: 'hod123',
    user: {
      id: '2',
      name: 'Dr. Priya Sharma',
      email: 'hod@sipna.edu',
      role: 'hod',
      department: 'Computer Science'
    }
  },
  'principal@sipna.edu': {
    password: 'principal123',
    user: {
      id: '3',
      name: 'Dr. Suresh Patel',
      email: 'principal@sipna.edu',
      role: 'principal'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, role: UserRole): boolean => {
    const userData = mockUsers[email];
    if (userData && userData.password === password && userData.user.role === role) {
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}