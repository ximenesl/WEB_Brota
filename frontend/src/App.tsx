import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { WarehouseManagement } from './components/WarehouseManagement';
import { SupplierManagement } from './components/SupplierManagement';
import { SeedManagement } from './components/SeedManagement';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';
import api from './services/api';

export type Page = 'login' | 'register' | 'dashboard' | 'warehouses' | 'suppliers' | 'seeds' | 'profile';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('login');
  };

  if (!user) {
    return (
      <>
        {currentPage === 'login' ? (
          <LoginPage 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setCurrentPage('register')} 
          />
        ) : (
          <RegisterPage 
            onRegister={handleRegister} 
            onNavigateToLogin={() => setCurrentPage('login')} 
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        user={user}
      />
      <main className="flex-1 overflow-auto">
        {currentPage === 'dashboard' && <Dashboard user={user} />}
        {currentPage === 'warehouses' && <WarehouseManagement />}
        {currentPage === 'suppliers' && <SupplierManagement />}
        {currentPage === 'seeds' && <SeedManagement />}
        {currentPage === 'profile' && <ProfilePage user={user} setUser={setUser} />}
      </main>
    </div>
  );
}