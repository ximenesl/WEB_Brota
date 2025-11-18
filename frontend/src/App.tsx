import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { WarehouseManagement } from './components/WarehouseManagement';
import { SupplierManagement } from './components/SupplierManagement';
import { SeedManagement } from './components/SeedManagement';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';

export type Page = 'login' | 'register' | 'dashboard' | 'warehouses' | 'suppliers' | 'seeds' | 'profile';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - In production, this would authenticate with backend
    setUser({
      id: '1',
      name: 'João Silva',
      email: email,
      role: 'Administrador',
    });
    setCurrentPage('dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock registration - In production, this would create user in backend
    setUser({
      id: '1',
      name: name,
      email: email,
      role: 'Usuário',
    });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
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