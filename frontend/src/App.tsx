import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { WarehouseManagement } from './pages/WarehouseManagement';
import { SupplierManagement } from './pages/SupplierManagement';
import { SeedManagement } from './pages/SeedManagement';
import { ProfilePage } from './pages/ProfilePage';
import { Sidebar } from './layouts/Sidebar';
import api from './services/api';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

const Layout = ({ user, onLogout, children }) => (
  <div className="min-h-screen bg-gray-50 flex">
    <Sidebar 
      onLogout={onLogout}
      user={user}
    />
    <main className="flex-1 overflow-auto">
      {children}
    </main>
  </div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
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
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
  
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route 
            path="/*"
            element={
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard user={user} />} />
                  <Route path="/warehouses" element={<WarehouseManagement />} />
                  <Route path="/suppliers" element={<SupplierManagement />} />
                  <Route path="/seeds" element={<SeedManagement />} />
                  <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            } 
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}